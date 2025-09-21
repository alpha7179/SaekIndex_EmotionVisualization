using System.Collections.Generic;
using UnityEngine;

public class EmotionCharacterSpawner : MonoBehaviour
{
    [Header("Spawner Settings")]
    public List<GameObject> prefabList;
    public int spawnCount = 10;
    [Tooltip("������ ������ �ε��� (0���� ����)")]
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
                Debug.LogError("DataManager �ν��Ͻ��� �����ϴ�.");
                return;
            }
            minPosition = DataManager.Instance.minBounds;
            maxPosition = DataManager.Instance.maxBounds;
            boundsInitialized = true;
        }

        if (DataManager.Instance != null)
        {
            string currentDominantEmotion = DataManager.Instance.DominantEmotion;

            // dominantEmotion�� ����Ǿ��� ���� ó��
            if (!string.IsNullOrEmpty(currentDominantEmotion) && currentDominantEmotion != lastDominantEmotion)
            {
                Debug.Log($"dominantEmotion ���� ������: {currentDominantEmotion}");
                lastDominantEmotion = currentDominantEmotion;
                UpdatePrefabIndexByEmotion(currentDominantEmotion);
                SpawnPrefabs();
            }
        }
    }

    // dominantEmotion�� �´� ������ �ε��� ã��
    private void UpdatePrefabIndexByEmotion(string emotion)
    {
        emotion = emotion.ToLower();

        for (int i = 0; i < prefabList.Count; i++)
        {
            string prefabName = prefabList[i].name.ToLower();
            if (prefabName.StartsWith(emotion))
            {
                prefabIndexToSpawn = i;
                Debug.Log($"dominantEmotion '{emotion}' �� �����ϴ� ���������� ����: {prefabList[i].name}");
                return;
            }
        }
        Debug.LogWarning($"dominantEmotion '{emotion}' �� �����ϴ� �������� ���� �⺻ �ε��� ����: {prefabIndexToSpawn}");
    }


    void SpawnPrefabs()
    {
        if (prefabList == null || prefabList.Count == 0)
        {
            Debug.LogError("������ ����Ʈ�� ����ֽ��ϴ�.");
            return;
        }

        if (prefabIndexToSpawn < 0 || prefabIndexToSpawn >= prefabList.Count)
        {
            Debug.LogError("��ȿ���� ���� ������ �ε����Դϴ�.");
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
            Debug.Log($"��ü�� �����Ǿ����ϴ�. ��ġ: {randomPos} / ��ü �̸�: {spawnedObj.name}");
        }
    }
}
