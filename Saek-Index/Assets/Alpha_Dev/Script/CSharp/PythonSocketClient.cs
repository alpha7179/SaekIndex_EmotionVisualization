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
            Debug.Log("서버에 연결됨");

            // 비동기 방식으로 데이터 읽기 시작
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
                // 연결 종료
                Debug.Log("서버 연결이 종료됨");
                return;
            }

            string receivedData = Encoding.UTF8.GetString(buffer, 0, bytesRead);

            // 받아온 JSON 문자열을 파싱 후 로그 출력
            EmotionData emotion = JsonUtility.FromJson<EmotionData>(receivedData);
            Debug.Log($"받은 데이터 - 파일명: {emotion.filename}, 시간: {emotion.time}");

            // 데이터 추가 수신 대기
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
    }
}
