using UnityEngine;

public class BoundaryManager : MonoBehaviour
{
    public Vector3 minBounds;
    public Vector3 maxBounds;
    public Camera orthoCamera; // 참조할 Orthographic 카메라 지정

    void Start()
    {
        UpdateBoundsFromCamera();
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

        // DataManager에 전달
        if (DataManager.Instance != null)
        {
            DataManager.Instance.SetBounds(minBounds, maxBounds);
            Debug.Log("BoundaryManager가 DataManager에 경계값 전달 완료");
        }
        else
        {
            Debug.LogError("DataManager 인스턴스가 존재하지 않습니다.");
        }
    }

    private void OnDrawGizmos()
    {
        Gizmos.color = Color.cyan;
        Vector3 center = (minBounds + maxBounds) / 2f;
        Vector3 size = maxBounds - minBounds;
        size.z = Mathf.Max(size.z, 0.1f);
        Gizmos.DrawWireCube(center, size);
    }
}
