using UnityEngine;

public class EmotionCharacterMover : MonoBehaviour
{
    [Header("Movement Settings")]
    public float minSpeed = 1f;
    public float maxSpeed = 3f;
    public bool stopMovement = false;

    [Header("Rotation Settings")]
    public float minRotationSpeed = 30f;
    public float maxRotationSpeed = 90f;
    public bool stopRotation = false;

    [Header("Boundary Settings")]
    [ReadOnly] public Vector3 minBounds;
    [ReadOnly] public Vector3 maxBounds;

    [ReadOnly] private Vector3 moveDirection;
    [ReadOnly] private float moveSpeed;

    private Vector3 rotationAxis;
    private float rotationSpeed;

    void Start()
    {
        moveDirection = Random.onUnitSphere.normalized;
        moveSpeed = Random.Range(minSpeed, maxSpeed);

        rotationAxis = Random.onUnitSphere.normalized;
        rotationSpeed = Random.Range(minRotationSpeed, maxRotationSpeed);
    }

    void Update()
    {
        if (!stopMovement)
        {
            transform.Translate(moveDirection * moveSpeed * Time.deltaTime, Space.World);
        }

        if (!stopRotation)
        {
            transform.Rotate(rotationAxis, rotationSpeed * Time.deltaTime, Space.World);
        }

        if (DataManager.Instance == null)
            return;

        Vector3 pos = transform.position;
        Vector3 min = DataManager.Instance.minBounds;
        Vector3 max = DataManager.Instance.maxBounds;

        if (pos.x < min.x - 1 || pos.x > max.x + 1 ||
            pos.y < min.y - 1 || pos.y > max.y + 1 ||
            pos.z < min.z - 1 || pos.z > max.z + 1)
        {
            Destroy(gameObject);
        }
    }
}
