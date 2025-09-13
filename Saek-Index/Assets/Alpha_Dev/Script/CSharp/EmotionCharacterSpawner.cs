using System.Collections.Generic;
using UnityEngine;

public class EmotionCharacterSpawner : MonoBehaviour
{
    [Header("Spawner Settings")]
    public List<GameObject> prefabList;
    public int spawnCount = 10;
    [Tooltip("생성할 프리팹 인덱스 (0부터 시작)")]
    public int prefabIndexToSpawn = 0;

    [Header("Spawn Position Range")]
    [ReadOnly] public Vector3 minPosition;
    [ReadOnly] public Vector3 maxPosition;

    private bool boundsInitialized = false;

    void Update()
    {
        // 경계값 초기화
        if (!boundsInitialized)
        {
            if (BoundaryManager.Instance == null)
            {
                Debug.LogError("BoundaryManager 인스턴스가 없습니다.");
                return;
            }
            minPosition = BoundaryManager.Instance.minBounds;
            maxPosition = BoundaryManager.Instance.maxBounds;
            boundsInitialized = true;
        }

        if (Input.GetKeyDown(KeyCode.P))
        {
            Debug.Log("P 키가 눌렸습니다.");
            SpawnPrefabs();
        }
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
