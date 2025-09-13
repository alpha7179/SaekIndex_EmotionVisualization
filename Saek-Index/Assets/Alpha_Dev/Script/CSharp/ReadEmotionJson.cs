using System.IO;
using UnityEngine;

public class JsonReader
{
    public void ReadEmotionJson(string path)
    {
        if (!File.Exists(path))
        {
            Debug.LogError("파일이 존재하지 않습니다: " + path);
            return;
        }
        try
        {
            string jsonString = File.ReadAllText(path);
            EmotionValues data = JsonUtility.FromJson<EmotionValues>(jsonString);
            Debug.Log($"감정 데이터 읽음 - joy: {data.joy}, sadness: {data.sadness}, surprise: {data.surprise}, anger: {data.anger}, calm: {data.calm}, dominant_emotion: {data.dominant_emotion}");

            // DataManager 존재 확인 및 데이터 저장
            if (DataManager.Instance != null)
            {
                DataManager.Instance.SetEmotionData(data);
            }
            else
            {
                Debug.LogError("DataManager 인스턴스를 찾을 수 없습니다.");
            }
        }
        catch (System.Exception e)
        {
            Debug.LogError("JSON 파싱 오류: " + e.Message);
        }
    }

    [System.Serializable]
    public class EmotionValues
    {
        public float joy;
        public float sadness;
        public float surprise;
        public float anger;
        public float calm;
        public string dominant_emotion;
    }
}
