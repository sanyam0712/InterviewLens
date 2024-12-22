import sounddevice as sd
import numpy as np
import scipy.io.wavfile as wav
import webrtcvad
import time
import signal
import sys
import librosa
import joblib

# Load the trained model and label encoder
model = joblib.load(r"F:\Cap_final\InterviewLens\backend\speech_fumble_detector.pkl")
  # Path to your trained model
label_encoder = joblib.load(r"F:\Cap_final\InterviewLens\backend\label_encoder.pkl")  # Path to your label encoder

# Function to record audio with VAD
def record_with_improved_vad(filename, sample_rate=16000,silence_timeout=4):
    vad = webrtcvad.Vad()
    vad.set_mode(3)  # Aggressiveness mode

    print("Recording... Press Ctrl+C to stop.")

    buffer_size = int(0.02 * sample_rate)  # 20 ms buffer size
    audio = np.array([], dtype=np.int16)  # Initialize as empty array
    buffer = []
    last_speech_time = time.time()  # Time of last detected speech

    def process_buffer():
        nonlocal audio
        if buffer:
            audio_chunk = np.concatenate(buffer).flatten()
            audio = np.concatenate((audio, audio_chunk))
            buffer.clear()

    def signal_handler(sig, frame):
        print("\nRecording stopped by user.")
        process_buffer()  # Process any remaining data in the buffer
        wav.write(filename, sample_rate, audio)
        print(f"Audio saved to {filename}")
        sys.exit(0)

    signal.signal(signal.SIGINT, signal_handler)

    stream = sd.InputStream(channels=1, samplerate=sample_rate, dtype=np.int16)

    with stream:
        try:
            while True:
                recording, _ = stream.read(buffer_size)
                is_speech = vad.is_speech(recording.tobytes(), sample_rate)

                # Always append to buffer, whether it's speech or silence
                buffer.append(recording)

                if is_speech:
                    last_speech_time = time.time()  # Reset the timer when speech is detected
                elif time.time() - last_speech_time > silence_timeout:
                    # If no speech for 6 seconds, stop the recording
                    break

        except Exception as e:
            print(f"An error occurred: {e}")
        finally:
            process_buffer()

    print("Recording finished.")
    wav.write(filename, sample_rate, audio)
    print(f"Audio saved to {filename}")

# Function to extract features from audio file
def extract_features(audio_path):
    audio, sr = librosa.load(audio_path, sr=None)
    mfccs = librosa.feature.mfcc(y=audio, sr=sr, n_mfcc=13).mean(axis=1)
    energy = np.sum(audio ** 2) / len(audio)
    pitches, magnitudes = librosa.piptrack(y=audio, sr=sr)
    pitch = np.mean(pitches[magnitudes > np.median(magnitudes)]) if np.any(magnitudes) else 0

    return np.hstack([mfccs, energy, pitch])

# Function to predict if the audio is normal speech or nervous
def detect_fumble():
    try:
        filename = "real_time_audio.wav"
        record_with_improved_vad(filename)  # Record audio with 4 seconds silence timeout
        features = extract_features(filename).reshape(1, -1)  # Extract and reshape features

        # Make prediction
        prediction = model.predict(features)  # Predict using the model
        predicted_label = label_encoder.inverse_transform(prediction)  # Decode label

        print(f"Predicted Class: {predicted_label[0]}")  # Print the predicted label (normal or nervous)
    except KeyboardInterrupt:
        print("Real-time detection stopped.")

if __name__ == "__main__":
    detect_fumble()
