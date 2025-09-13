using UnityEngine;

public class BoundaryManager : MonoBehaviour
{
    public Vector3 minBounds;
    public Vector3 maxBounds;

    public Camera orthoCamera; // ������ Orthographic ī�޶� ����

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
            Debug.LogError("Orthographic ī�޶� �����ϰų�, �ùٸ� ������� Ȯ���ϼ���.");
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

        size.z = Mathf.Max(size.z, 0.1f); // 3D Z ũ�� �ּ� ����

        Gizmos.DrawWireCube(center, size);
    }
}
