using System;
using System.Collections;
using System.IO;
using UnityEngine;

public class EmotionFileWatcher : MonoBehaviour
{
    [Header("File Watcher Settings")]
    [Tooltip("Assets 폴더를 기준으로 한 상대 경로입니다.")]
    public string dataPath = "Scripts/Emotion/Data"; // Assets/ 폴더부터 시작하는 상대 경로가 더 안정적입니다.
    public string fileNamePattern = "Emotion_Metadata";
    public float checkInterval = 1.0f;

    private string fullPath;
    private DateTime lastCheckTime;
    private JsonReader jsonReader; // JsonReader를 미리 생성하여 재사용합니다.

    void Start()
    {
        // [리팩토링 1] Path.Combine을 사용하여 더 안정적으로 전체 경로를 생성합니다.
        fullPath = Path.Combine(Application.dataPath, dataPath);

        if (!Directory.Exists(fullPath))
        {
            Debug.LogError($"데이터 경로를 찾을 수 없습니다: {fullPath}");
            enabled = false; // 컴포넌트를 비활성화하여 불필요한 업데이트를 막습니다.
            return;
        }

        // [리팩토링 2] JsonReader 인스턴스를 한 번만 생성합니다.
        jsonReader = new JsonReader();

        // [리팩토링 3] 시간 비교를 위해 DateTime.UtcNow를 사용합니다.
        // Time.time은 게임 시작 후 경과 시간이므로 파일의 절대적인 수정 시간과 비교하기에 부적합합니다.
        lastCheckTime = DateTime.UtcNow;

        StartCoroutine(WatchForNewFiles());
    }

    private IEnumerator WatchForNewFiles()
    {
        // WaitForSeconds 객체를 재사용하여 가비지 생성을 줄입니다.
        var wait = new WaitForSeconds(checkInterval);

        while (true)
        {
            yield return wait;

            try
            {
                // "*.json" 검색 패턴으로 .json 파일만 효율적으로 가져옵니다.
                string[] files = Directory.GetFiles(fullPath, "*.json");

                foreach (string file in files) 
                {
                    // StartsWith는 비용이 약간 있으므로, 패턴이 파일 이름보다 길 경우 확인할 필요가 없습니다.
                    string fileName = Path.GetFileName(file);
                    if (fileName.Length < fileNamePattern.Length || !fileName.StartsWith(fileNamePattern))
                    {
                        continue;
                    }

                    // [리팩토링 3] 파일의 마지막 수정 시간을 UTC 기준으로 가져와 직접 비교합니다.
                    DateTime fileWriteTime = File.GetLastWriteTimeUtc(file);

                    if (fileWriteTime > lastCheckTime)
                    {
                        Debug.Log($"새로운 감정 파일 감지됨: {fileName}");

                        // 미리 생성해 둔 jsonReader 인스턴스를 사용합니다.
                        jsonReader.ReadEmotionJson(file);
                    }
                }

                // 모든 파일 확인 후, 현재 UTC 시간을 마지막 체크 시간으로 업데이트합니다.
                lastCheckTime = DateTime.UtcNow;
            }
            catch (Exception ex)
            {
                // 파일 시스템 접근 중 오류가 발생할 수 있으므로 예외 처리를 추가합니다.
                Debug.LogError($"파일을 확인하는 중 오류가 발생했습니다: {ex.Message}");
            }
        }
    }
}