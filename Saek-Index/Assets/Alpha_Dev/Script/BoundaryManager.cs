using UnityEngine;

public class BoundaryManager : MonoBehaviour
{
    public Vector3 minBounds = new Vector3(-5, -5, -5);
    public Vector3 maxBounds = new Vector3(5, 5, 5);

    // �̱��� �ν��Ͻ� (�ʿ� ��)
    public static BoundaryManager Instance { get; private set; }

    private void Awake()
    {
        if (Instance != null && Instance != this)
        {
            Destroy(gameObject);
            return;
        }
        Instance = this;
    }

    private void OnDrawGizmos()
    {
        Gizmos.color = Color.cyan;

        Vector3 center = (minBounds + maxBounds) / 2f;
        Vector3 size = maxBounds - minBounds;
        size.y = Mathf.Max(size.y, 0.1f); // �ּ� ���� ����

        // ��踦 ����� �簢�� �ڽ��� �׸�
        Gizmos.DrawWireCube(center, size);
    }
}
