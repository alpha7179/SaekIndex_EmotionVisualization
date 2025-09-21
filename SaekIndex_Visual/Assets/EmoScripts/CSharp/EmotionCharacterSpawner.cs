using System.Collections.Generic;
using UnityEngine;

public class EmotionCharacterSpawner : MonoBehaviour
{
    [Header("Spawner Settings")]
    public List<GameObject> prefabList;
    public int spawnCount = 10;
    [Tooltip("생성할 프리팹 인덱스 (0부터 시작)")]
    [ReadOnly] public int prefabIndexToSpawn = 0;

    [Header("Spawn Position Range")]
    [ReadOnly] public Vector3 minPosition;
    [ReadOnly] public Vector3 maxPosition;

    private bool boundsInitialized = false;
    private string lastDominantEmotion = null;

    void Update()
    {
        if (!boundsInitialized)
        {
            if (DataManager.Instance == null)
            {
                Debug.LogError("DataManager 인스턴스가 없습니다.");
                return;
            }
            minPosition = DataManager.Instance.minBounds;
            maxPosition = DataManager.Instance.maxBounds;
            boundsInitialized = true;
        }

        if (DataManager.Instance != null)
        {
            string currentDominantEmotion = DataManager.Instance.DominantEmotion;

            // dominantEmotion이 변경되었을 때만 처리
            if (!string.IsNullOrEmpty(currentDominantEmotion) && currentDominantEmotion != lastDominantEmotion)
            {
                Debug.Log($"dominantEmotion 변경 감지됨: {currentDominantEmotion}");
                lastDominantEmotion = currentDominantEmotion;
                UpdatePrefabIndexByEmotion(currentDominantEmotion);
                SpawnPrefabs();
            }
        }
    }

    // dominantEmotion에 맞는 프리팹 인덱스 찾기
    private void UpdatePrefabIndexByEmotion(string emotion)
    {
        emotion = emotion.ToLower();

        for (int i = 0; i < prefabList.Count; i++)
        {
            string prefabName = prefabList[i].name.ToLower();
            if (prefabName.StartsWith(emotion))
            {
                prefabIndexToSpawn = i;
                Debug.Log($"dominantEmotion '{emotion}' 로 시작하는 프리팹으로 변경: {prefabList[i].name}");
                return;
            }
        }
        Debug.LogWarning($"dominantEmotion '{emotion}' 로 시작하는 프리팹이 없어 기본 인덱스 유지: {prefabIndexToSpawn}");
    }


    void SpawnPrefabs()
    {
        if (prefabList == null || prefabList.Count == 0)
        {
            Debug.LogError("프리팹 리스트가 비어있습니다.");
            return;
        }

        if (prefabIndexToSpawn < 0 || prefabIndexToSpawn >= prefabList.Count)
        {
            Debug.LogError("유효하지 않은 프리팹 인덱스입니다.");
            return;
        }

        GameObject prefabToSpawn = prefabList[prefabIndexToSpawn];

        for (int i = 0; i < spawnCount; i++)
        {
            Vector3 randomPos = new Vector3(
                Random.Range(minPosition.x, maxPosition.x),
                Random.Range(minPosition.y, maxPosition.y),
                Random.Range(minPosition.z, maxPosition.z)
            );
            GameObject spawnedObj = Instantiate(prefabToSpawn, randomPos, Quaternion.identity);
            Debug.Log($"객체가 생성되었습니다. 위치: {randomPos} / 객체 이름: {spawnedObj.name}");
        }
    }
}
