using System;
using System.Net.Sockets;
using System.Text;
using System.IO;
using UnityEngine;
using System.Threading; // 스레드 사용을 위해 추가

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
            Debug.Log("서버에 연결됨");
            stream.BeginRead(buffer, 0, buffer.Length, OnDataReceived, null);
        }
        catch (Exception e)
        {
            Debug.LogError("서버 연결 실패: " + e.Message);
        }
    }

    private void OnDataReceived(IAsyncResult ar)
    {
        try
        {
            int bytesRead = stream.EndRead(ar);
            if (bytesRead == 0)
            {
                Debug.Log("서버 연결이 종료됨");
                return;
            }

            string receivedData = Encoding.UTF8.GetString(buffer, 0, bytesRead);
            EmotionData emotion = JsonUtility.FromJson<EmotionData>(receivedData);

            Debug.Log($"받은 데이터 - 파일명: {emotion.filename}, 시간: {emotion.time}, 절대경로: {emotion.fullpath}");

            string jsonFilePath = emotion.fullpath;

            // 파일이 생성되고 완전히 쓰여질 때까지 기다립니다.
            // 최대 5초까지 0.1초 간격으로 파일을 확인합니다.
            float startTime = Time.time;
            while (!File.Exists(jsonFilePath) && Time.time < startTime + 5f)
            {
                Thread.Sleep(100); // 100ms 대기
            }

            if (File.Exists(jsonFilePath))
            {
                JsonReader reader = new JsonReader();
                reader.ReadEmotionJson(jsonFilePath);
            }
            else
            {
                Debug.LogError($"지정된 시간 내에 파일이 생성되지 않았습니다: {jsonFilePath}");
            }

            // 추가 데이터 수신 대기
            stream.BeginRead(buffer, 0, buffer.Length, OnDataReceived, null);
        }
        catch (Exception e)
        {
            Debug.LogError("데이터 수신 오류: " + e.Message);
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
        public string fullpath;
    }
}