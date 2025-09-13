using System.IO;
using UnityEngine;

public class JsonReader : MonoBehaviour
{
    public void ReadEmotionJson(string path)
    {
        if (File.Exists(path))
        {
            string jsonString = File.ReadAllText(path);
            EmotionData data = JsonUtility.FromJson<EmotionData>(jsonString);
            Debug.Log($"joy: {data.joy}, sadness: {data.sadness}, surprise: {data.surprise}, anger: {data.anger}, calm: {data.calm}");
        }
        else
        {
            Debug.LogError("파일이 존재하지 않습니다: " + path);
        }
    }

    [System.Serializable]
    public class EmotionData
    {
        public float joy;
        public float sadness;
        public float surprise;
        public float anger;
        public float calm;
    }
}
