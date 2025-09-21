using System;
using System.Collections;
using System.IO;
using UnityEngine;

public class EmotionFileWatcher : MonoBehaviour
{
    [Header("File Watcher Settings")]
    [Tooltip("Assets ������ �������� �� ��� ����Դϴ�.")]
    public string dataPath = "Scripts/Emotion/Data"; // Assets/ �������� �����ϴ� ��� ��ΰ� �� �������Դϴ�.
    public string fileNamePattern = "Emotion_Metadata";
    public float checkInterval = 1.0f;

    private string fullPath;
    private DateTime lastCheckTime;
    private JsonReader jsonReader; // JsonReader�� �̸� �����Ͽ� �����մϴ�.

    void Start()
    {
        // [�����丵 1] Path.Combine�� ����Ͽ� �� ���������� ��ü ��θ� �����մϴ�.
        fullPath = Path.Combine(Application.dataPath, dataPath);

        if (!Directory.Exists(fullPath))
        {
            Debug.LogError($"������ ��θ� ã�� �� �����ϴ�: {fullPath}");
            enabled = false; // ������Ʈ�� ��Ȱ��ȭ�Ͽ� ���ʿ��� ������Ʈ�� �����ϴ�.
            return;
        }

        // [�����丵 2] JsonReader �ν��Ͻ��� �� ���� �����մϴ�.
        jsonReader = new JsonReader();

        // [�����丵 3] �ð� �񱳸� ���� DateTime.UtcNow�� ����մϴ�.
        // Time.time�� ���� ���� �� ��� �ð��̹Ƿ� ������ �������� ���� �ð��� ���ϱ⿡ �������մϴ�.
        lastCheckTime = DateTime.UtcNow;

        StartCoroutine(WatchForNewFiles());
    }

    private IEnumerator WatchForNewFiles()
    {
        // WaitForSeconds ��ü�� �����Ͽ� ������ ������ ���Դϴ�.
        var wait = new WaitForSeconds(checkInterval);

        while (true)
        {
            yield return wait;

            try
            {
                // "*.json" �˻� �������� .json ���ϸ� ȿ�������� �����ɴϴ�.
                string[] files = Directory.GetFiles(fullPath, "*.json");

                foreach (string file in files) 
                {
                    // StartsWith�� ����� �ణ �����Ƿ�, ������ ���� �̸����� �� ��� Ȯ���� �ʿ䰡 �����ϴ�.
                    string fileName = Path.GetFileName(file);
                    if (fileName.Length < fileNamePattern.Length || !fileName.StartsWith(fileNamePattern))
                    {
                        continue;
                    }

                    // [�����丵 3] ������ ������ ���� �ð��� UTC �������� ������ ���� ���մϴ�.
                    DateTime fileWriteTime = File.GetLastWriteTimeUtc(file);

                    if (fileWriteTime > lastCheckTime)
                    {
                        Debug.Log($"���ο� ���� ���� ������: {fileName}");

                        // �̸� ������ �� jsonReader �ν��Ͻ��� ����մϴ�.
                        jsonReader.ReadEmotionJson(file);
                    }
                }

                // ��� ���� Ȯ�� ��, ���� UTC �ð��� ������ üũ �ð����� ������Ʈ�մϴ�.
                lastCheckTime = DateTime.UtcNow;
            }
            catch (Exception ex)
            {
                // ���� �ý��� ���� �� ������ �߻��� �� �����Ƿ� ���� ó���� �߰��մϴ�.
                Debug.LogError($"������ Ȯ���ϴ� �� ������ �߻��߽��ϴ�: {ex.Message}");
            }
        }
    }
}