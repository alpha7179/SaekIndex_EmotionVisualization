using System.Collections.Generic;
using UnityEngine;

public class EmotionCharacterSpawner : MonoBehaviour
{
    [Header("Spawner Settings")]
    public List<GameObject> prefabList;
    public int spawnCount = 10;
    [Tooltip("������ ������ �ε��� (0���� ����)")]
    public int prefabIndexToSpawn = 0;

    [Header("Spawn Position Range")]
    [ReadOnly] public Vector3 minPosition;
    [ReadOnly] public Vector3 maxPosition;

    private bool boundsInitialized = false;

    void Update()
    {
        // ��谪 �ʱ�ȭ
        if (!boundsInitialized)
        {
            if (BoundaryManager.Instance == null)
            {
                Debug.LogError("BoundaryManager �ν��Ͻ��� �����ϴ�.");
                return;
            }
            minPosition = BoundaryManager.Instance.minBounds;
            maxPosition = BoundaryManager.Instance.maxBounds;
            boundsInitialized = true;
        }

        if (Input.GetKeyDown(KeyCode.P))
        {
            Debug.Log("P Ű�� ���Ƚ��ϴ�.");
            SpawnPrefabs();
        }
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
