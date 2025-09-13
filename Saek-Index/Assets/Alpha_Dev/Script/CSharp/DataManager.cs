using UnityEngine;

public class DataManager : MonoBehaviour
{
    public static DataManager Instance { get; private set; }

    [ReadOnly] public Vector3 minBounds;
    [ReadOnly] public Vector3 maxBounds;

    [ReadOnly] public float Joy;
    [ReadOnly] public float Sadness;
    [ReadOnly] public float Surprise;
    [ReadOnly] public float Anger;
    [ReadOnly] public float Calm;
    [ReadOnly] public string DominantEmotion;

    private void Awake()
    {
        if (Instance != null && Instance != this)
        {
            Destroy(gameObject);
            return;
        }
        Instance = this;
        DontDestroyOnLoad(gameObject);
    }

    public void SetBounds(Vector3 MinBounds, Vector3 MaxBounds)
    {
        minBounds = MinBounds;
        maxBounds = MaxBounds;
        Debug.Log($"DataManager�� ��� ���õ� - Min: {MinBounds}, Max: {MaxBounds}");
    }

    // JsonReader���� ȣ���� ���� ������ ���� �޼���
    public void SetEmotionData(JsonReader.EmotionValues data)
    {
        Joy = data.joy;
        Sadness = data.sadness;
        Surprise = data.surprise;
        Anger = data.anger;
        Calm = data.calm;
        DominantEmotion = data.dominant_emotion;

        Debug.Log($"DataManager�� ���� ������ ���� - joy:{Joy}, sadness:{Sadness}, surprise:{Surprise}, anger:{Anger}, calm:{Calm}, dominant_emotion:{DominantEmotion}");
    }
}
