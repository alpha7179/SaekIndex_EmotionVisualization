using System;
using System.Net.Sockets;
using System.Text;
using System.IO;
using UnityEngine;

public class PythonSocketClient : MonoBehaviour
{
    public string host = "127.0.0.1";
    public int port = 5500;
    private TcpClient client;
    private NetworkStream stream;
    private byte[] buffer = new byte[4096];

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
                Debug.Log("���� ������ �����");
                return;
            }

            string receivedData = Encoding.UTF8.GetString(buffer, 0, bytesRead);
            EmotionData emotion = JsonUtility.FromJson<EmotionData>(receivedData);

            Debug.Log($"���� ������ - ���ϸ�: {emotion.filename}, �ð�: {emotion.time}, ������: {emotion.fullpath}");

            string jsonFilePath = emotion.fullpath;  // Python���� ���޵� ������ ���

            JsonReader reader = new JsonReader();
            reader.ReadEmotionJson(jsonFilePath);

            // �߰� ������ ���� ���
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
        public string filename;   // JSON ���ϸ�
        public string time;       // ���� �ð�
        public string fullpath;   // ���� ���
    }
}
