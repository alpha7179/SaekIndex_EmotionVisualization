using UnityEngine;

public class EmotionCharacterSpawner : MonoBehaviour
{
    [Header("Spawner Settings")]
    public GameObject prefabToSpawn;
    public int spawnCount = 10;

    [Header("Spawn Position Range")]
    public Vector3 minPosition;
    public Vector3 maxPosition;

    void Start()
    {
        if (prefabToSpawn == null)
        {
            Debug.LogError("프리팹이 지정되지 않았습니다.");
            return;
        }

        if (BoundaryManager.Instance == null)
        {
            Debug.LogError("BoundaryManager 인스턴스가 없습니다.");
            return;
        }

        Vector3 minPos = BoundaryManager.Instance.minBounds;
        Vector3 maxPos = BoundaryManager.Instance.maxBounds;

        for (int i = 0; i < spawnCount; i++)
        {
            Vector3 randomPos = new Vector3(
                Random.Range(minPos.x, maxPos.x),
                Random.Range(minPos.y, maxPos.y),
                Random.Range(minPos.z, maxPos.z)
            );

            Instantiate(prefabToSpawn, randomPos, Quaternion.identity);
        }
    }
}
