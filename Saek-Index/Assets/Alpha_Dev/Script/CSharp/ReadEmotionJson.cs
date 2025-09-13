using System.IO;
using UnityEngine;

public class JsonReader
{
    public void ReadEmotionJson(string path)
    {
        if (!File.Exists(path))
        {
            Debug.LogError("������ �������� �ʽ��ϴ�: " + path);
            return;
        }
        try
        {
            string jsonString = File.ReadAllText(path);
            EmotionValues data = JsonUtility.FromJson<EmotionValues>(jsonString);
            Debug.Log($"���� ������ ���� - joy: {data.joy}, sadness: {data.sadness}, surprise: {data.surprise}, anger: {data.anger}, calm: {data.calm}, dominant_emotion: {data.dominant_emotion}");

            // DataManager ���� Ȯ�� �� ������ ����
            if (DataManager.Instance != null)
            {
                DataManager.Instance.SetEmotionData(data);
            }
            else
            {
                Debug.LogError("DataManager �ν��Ͻ��� ã�� �� �����ϴ�.");
            }
        }
        catch (System.Exception e)
        {
            Debug.LogError("JSON �Ľ� ����: " + e.Message);
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
