from flask import jsonify
import cv2
from deepface import DeepFace
from collections import Counter
import json

def analyze_emotions():
    faceCascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        raise IOError("Cannot open webcam")

    emotion_list = []
    total_frames = 0

    while total_frames < 100:  # Limit to 100 frames for this example
        ret, frame = cap.read()
        if not ret:
            break
        total_frames += 1

        try:
            result = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
            dominant_emotion = result[0]['dominant_emotion']
            emotion_list.append(dominant_emotion)
        except Exception as e:
            print(f"DeepFace error: {e}")
            continue

    cap.release()
    cv2.destroyAllWindows()

    # Calculate final percentages
    emotion_counter = Counter(emotion_list)
    emotion_percentages = {
        emotion: (count / total_frames) * 100 for emotion, count in emotion_counter.items()
    }
    return emotion_percentages

if __name__ == '__main__':
    result = analyze_emotions()
    # Output result as JSON
    print(json.dumps(result))
