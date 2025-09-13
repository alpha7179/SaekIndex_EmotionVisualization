using UnityEngine;

public class BoundaryManager : MonoBehaviour
{
    public Vector3 minBounds;
    public Vector3 maxBounds;

    public Camera orthoCamera; // 참조할 Orthographic 카메라 지정

    public static BoundaryManager Instance { get; private set; }

    private void Awake()
    {
        if (Instance != null && Instance != this)
        {
            Destroy(gameObject);
            return;
        }
        Instance = this;

        UpdateBoundsFromCamera();
    }

    private void Start()
    {
        
    }

    public void UpdateBoundsFromCamera()
    {
        if (orthoCamera == null || !orthoCamera.orthographic)
        {
            Debug.LogError("Orthographic 카메라를 지정하거나, 올바른 모드인지 확인하세요.");
            return;
        }

        float vertExtent = orthoCamera.orthographicSize;
        float horzExtent = vertExtent * orthoCamera.aspect;

        Vector3 camPos = orthoCamera.transform.position;

        minBounds = new Vector3(camPos.x - horzExtent, camPos.y - vertExtent, -10);
        maxBounds = new Vector3(camPos.x + horzExtent, camPos.y + vertExtent, 10);
    }

    private void OnDrawGizmos()
    {
        Gizmos.color = Color.cyan;
        Vector3 center = (minBounds + maxBounds) / 2f;
        Vector3 size = maxBounds - minBounds;

        size.z = Mathf.Max(size.z, 0.1f); // 3D Z 크기 최소 설정

        Gizmos.DrawWireCube(center, size);
    }
}
