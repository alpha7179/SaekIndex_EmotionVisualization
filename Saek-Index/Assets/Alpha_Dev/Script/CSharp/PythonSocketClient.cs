using System;
using System.Net.Sockets;
using System.Text;
using UnityEngine;

public class PythonSocketClient : MonoBehaviour
{
    public string host = "127.0.0.1";
    public int port = 65432;

    private TcpClient client;
    private NetworkStream stream;
    private byte[] buffer = new byte[1024];

    void Start()
    {
        ConnectToServer();
    }

    void ConnectToServer()
    {
        try
        {
            client = new TcpClient(host, port);
            stream = client.GetStream();
            Debug.Log("������ �����");

            // �񵿱� ������� ������ �б� ����
            stream.BeginRead(buffer, 0, buffer.Length, OnDataReceived, null);
        }
        catch (Exception e)
        {
            Debug.LogError("���� ���� ����: " + e.Message);
        }
    }

    private void OnDataReceived(IAsyncResult ar)
    {
        try
        {
            int bytesRead = stream.EndRead(ar);
            if (bytesRead == 0)
            {
                // ���� ����
                Debug.Log("���� ������ �����");
                return;
            }

            string receivedData = Encoding.UTF8.GetString(buffer, 0, bytesRead);

            // �޾ƿ� JSON ���ڿ��� �Ľ� �� �α� ���
            EmotionData emotion = JsonUtility.FromJson<EmotionData>(receivedData);
            Debug.Log($"���� ������ - ���ϸ�: {emotion.filename}, �ð�: {emotion.time}");

            // ������ �߰� ���� ���
            stream.BeginRead(buffer, 0, buffer.Length, OnDataReceived, null);
        }
        catch (Exception e)
        {
            Debug.LogError("������ ���� ����: " + e.Message);
        }
    }

    private void OnApplicationQuit()
    {
        if (stream != null) stream.Close();
        if (client != null) client.Close();
    }

    [Serializable]
    public class EmotionData
    {
        public string filename;
        public string time;
    }
}
