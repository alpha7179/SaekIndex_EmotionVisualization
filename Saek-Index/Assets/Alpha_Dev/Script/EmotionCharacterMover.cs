using UnityEngine;

public class EmotionCharacterMover : MonoBehaviour
{
    [Header("Movement Settings")]
    public float moveSpeed = 2f;

    [Header("Boundary Settings")]
    public Vector3 minBounds;
    public Vector3 maxBounds;
    private Vector3 moveDirection;

    void Start()
    {
        moveDirection = Random.onUnitSphere;
        moveDirection.y = 0f;
        moveDirection.Normalize();
    }

    void Update()
    {
        transform.Translate(moveDirection * moveSpeed * Time.deltaTime, Space.World);

        if (BoundaryManager.Instance == null)
            return;

        Vector3 pos = transform.position;
        Vector3 min = BoundaryManager.Instance.minBounds;
        Vector3 max = BoundaryManager.Instance.maxBounds;

        if (pos.x < min.x || pos.x > max.x ||
            pos.y < min.y || pos.y > max.y ||
            pos.z < min.z || pos.z > max.z)
        {
            Destroy(gameObject);
        }
    }
}