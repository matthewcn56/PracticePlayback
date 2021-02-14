const int SPEAKER = 23;
unsigned long NOTE_DUR = 100;
int transposeVal = 0;
const int freq = 2000;
const int channel = 0;
const int resolution = 8;

#include "pitches.h"
#include "secrets.h"
#include <WiFi.h>
#include <FirebaseESP32.h>
#include <string>
#include <sstream>  
using namespace std;

// index = pitch - 23
const int pitchArr[89] = { NOTE_B0,
                     NOTE_C1, NOTE_CS1, NOTE_D1, NOTE_DS1, NOTE_E1, NOTE_F1, NOTE_FS1, NOTE_G1, NOTE_GS1, NOTE_A1, NOTE_AS1, NOTE_B1,
                     NOTE_C2, NOTE_CS2, NOTE_D2, NOTE_DS2, NOTE_E2, NOTE_F2, NOTE_FS2, NOTE_G2, NOTE_GS2, NOTE_A2, NOTE_AS2, NOTE_B2,
                     NOTE_C3, NOTE_CS3, NOTE_D3, NOTE_DS3, NOTE_E3, NOTE_F3, NOTE_FS3, NOTE_G3, NOTE_GS3, NOTE_A3, NOTE_AS3, NOTE_B3,
                     NOTE_C4, NOTE_CS4, NOTE_D4, NOTE_DS4, NOTE_E4, NOTE_F4, NOTE_FS4, NOTE_G4, NOTE_GS4, NOTE_A4, NOTE_AS4, NOTE_B4,
                     NOTE_C5, NOTE_CS5, NOTE_D5, NOTE_DS5, NOTE_E5, NOTE_F5, NOTE_FS5, NOTE_G5, NOTE_GS5, NOTE_A5, NOTE_AS5, NOTE_B5,
                     NOTE_C6, NOTE_CS6, NOTE_D6, NOTE_DS6, NOTE_E6, NOTE_F6, NOTE_FS6, NOTE_G6, NOTE_GS6, NOTE_A6, NOTE_AS6, NOTE_B6,
                     NOTE_C7, NOTE_CS7, NOTE_D7, NOTE_DS7, NOTE_E7, NOTE_F7, NOTE_FS7, NOTE_G7, NOTE_GS7, NOTE_A7, NOTE_AS7, NOTE_B7,
                     NOTE_C8, NOTE_CS8, NOTE_D8, NOTE_DS8};


/* Define the Firebase Data object */
FirebaseData music;

String path = "";

void printResult(FirebaseData &data);
void play(int note, int dur);
void playJSON(FirebaseData &data);
// void countTwoMeas(int tempo);
unsigned long toMS(int tempo);

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

void setup()
{
  Serial.begin(115200);
  Serial.println();
  Serial.println();

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);

  Serial.println("------------------------------------");
  Serial.println("Begin stream 1...");
  if (!Firebase.beginStream(music, path + "/music2"))
  {
    Serial.println("FAILED - music");
    Serial.println("REASON: " + music.errorReason());
    Serial.println();
  }
  else
  {
    Serial.println("PASSED");
    Serial.println("------------------------------------");
    Serial.println();
  }

  ledcSetup(channel, freq, resolution);
  ledcAttachPin(SPEAKER, channel);
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

void loop()
{

  if (!Firebase.readStream(music))
  {
    Serial.println("Can't read music stream data");
    Serial.println("REASON: " + music.errorReason());
    Serial.println();
  }  

  if (music.streamTimeout())
  {
    Serial.println("Music stream timeout, resume streaming...");
    Serial.println();
  }

  if (music.streamAvailable())
  {
    Serial.println("------------------------------------");
    Serial.println("Stream Data Available...");
    Serial.println("STREAM PATH: " + music.streamPath());
    
    FirebaseJsonData tempoData, concertPitch;
    FirebaseJson &json = music.jsonObject();
    json.get(tempoData, "tempo");
    json.get(concertPitch, "concertPitch");
    int tempo = tempoData.intValue;
    String tempCP = concertPitch.stringValue;

    if ( tempCP == "Gb" )
      transposeVal = -6;
    if ( tempCP == "G" )
      transposeVal = -5;
    if ( tempCP == "Ab" )
      transposeVal = -4;
    if ( tempCP == "A" )
      transposeVal = -3;
    if ( tempCP == "Bb" )
      transposeVal = -2;
    if ( tempCP == "B" )
      transposeVal = -1;
    if ( tempCP == "C" )
      transposeVal = 0;
    if ( tempCP == "Db" )
      transposeVal = 1;
    if ( tempCP == "D" )
      transposeVal = 2;
    if ( tempCP == "Eb" )
      transposeVal = 3;
    if ( tempCP == "E" )
      transposeVal = 4;
    if ( tempCP == "F" )
      transposeVal = 5;

    NOTE_DUR = toMS(tempo);
    playJSON(music);
    
    Serial.println("------------------------------------");
    Serial.println();
  }
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

/* MUSIC */

unsigned long toMS(int tempo)
{
  return (60.0 * 1000.0 / tempo);
}

void play(int note, double dur)
{
  if (note - 23 + transposeVal < 0)
    note += 12;
  if (note - 23 + transposeVal > 88)
    note -= 12;
  ledcWriteTone(0, pitchArr[note - 23 + transposeVal]);
  delay(dur * NOTE_DUR * 4 / 5);
  ledcWriteTone(0, 0);
  delay(dur * NOTE_DUR / 5);
}

void playJSON(FirebaseData &data)
{
  FirebaseJson &json = data.jsonObject();
  size_t len = json.iteratorBegin();
  // Serial.println(len / 4);
  Serial.println("Playing...");
  for (size_t i = 4; i <= len; i+=4)
  {
    String keyName = "note" + String(i/4);
    FirebaseJsonData tmpJsonData;
    json.get(tmpJsonData, keyName);
    
    /*
    Serial.print(i/4);
    Serial.print(", Key: ");
    Serial.print(keyName);
    Serial.print(", Data type: " + tmpJsonData.type);
    Serial.println(", Data type Num: " + String(tmpJsonData.typeNum));
    */

    FirebaseJsonArray tmpArr;
    tmpJsonData.getArray(tmpArr);
    //Serial.println("Array Size: " + String(tmpArr.size()));
    //Serial.print(" - Pitch: ");
    tmpArr.get(tmpJsonData, 0);
    int pitch = tmpJsonData.intValue;
    tmpArr.get(tmpJsonData, 1);
    double startTime = tmpJsonData.doubleValue;
    tmpArr.get(tmpJsonData, 2);
    double endTime = tmpJsonData.doubleValue;
    double diff = endTime - startTime;
    play(pitch, diff);

    /*
    json.iteratorGet(i, type, key, value);
    Serial.print(i);
    Serial.print(", Key: ");
    Serial.print(key);
    Serial.print(", Value: ");
    Serial.println(value);
    */
  }
  json.iteratorEnd();
}

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
//////////EXTRANEOUS FUNCTIONS//////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


/*
void printResult(FirebaseData &data)
{

  if (data.dataType() == "int")
    Serial.println(data.intData());
  else if (data.dataType() == "float")
    Serial.println(data.floatData(), 5);
  else if (data.dataType() == "double")
    printf("%.9lf\n", data.doubleData());
  else if (data.dataType() == "boolean")
    Serial.println(data.boolData() == 1 ? "true" : "false");
  else if (data.dataType() == "string")
    Serial.println(data.stringData());
  else if (data.dataType() == "json")
  {
    Serial.println();
    FirebaseJson &json = data.jsonObject();
    //Print all object data
    //Serial.println("Pretty printed JSON data:");
    //String jsonStr;
    //json.toString(jsonStr, true);
    //Serial.println(jsonStr);
    //Serial.println();
    Serial.println("Iterate JSON data:");
    Serial.println();
    size_t len = json.iteratorBegin();
    //Serial.println(len / 4);
    String key, value = "";
    int type = 0;
    for (size_t i = 4; i <= len; i+=4)
    {
      String keyName = "note" + String(i/4);
      FirebaseJsonData tmpJsonData;
      json.get(tmpJsonData, keyName);

      
      Serial.print(i/4);
      /*Serial.print(", Key: ");
      Serial.print(keyName);
      Serial.print(", Data type: " + tmpJsonData.type);
      Serial.println(", Data type Num: " + String(tmpJsonData.typeNum));
      

      FirebaseJsonArray tmpArr;
      tmpJsonData.getArray(tmpArr);
      //Serial.println("Array Size: " + String(tmpArr.size()));
      Serial.print(" - Pitch: ");
      tmpArr.get(tmpJsonData, 0);
      Serial.print(tmpJsonData.intValue);
      Serial.print("startTime: ");
      tmpArr.get(tmpJsonData, 1);
      Serial.print(tmpJsonData.doubleValue);
      Serial.print("startTime: ");
      tmpArr.get(tmpJsonData, 2);
      Serial.println(tmpJsonData.doubleValue);

      /*
      json.iteratorGet(i, type, key, value);
      Serial.print(i);
      Serial.print(", Key: ");
      Serial.print(key);
      Serial.print(", Value: ");
      Serial.println(value);
      
    }
    json.iteratorEnd();
  }
  else if (data.dataType() == "array")
  {
    Serial.println();
    //get array data from FirebaseData using FirebaseJsonArray object
    FirebaseJsonArray &arr = data.jsonArray();
    //Print all array values
    Serial.println("Pretty printed Array:");
    String arrStr;
    arr.toString(arrStr, true);
    Serial.println(arrStr);
    Serial.println();
    Serial.println("Iterate array values:");
    Serial.println();
    for (size_t i = 0; i < arr.size(); i++)
    {
      Serial.print(i);
      Serial.print(", Value: ");

      FirebaseJsonData &jsonData = data.jsonData();
      //Get the result data from FirebaseJsonArray object
      arr.get(jsonData, i);
      if (jsonData.typeNum == FirebaseJson::JSON_BOOL)
        Serial.println(jsonData.boolValue ? "true" : "false");
      else if (jsonData.typeNum == FirebaseJson::JSON_INT)
        Serial.println(jsonData.intValue);
      else if (jsonData.typeNum == FirebaseJson::JSON_FLOAT)
        Serial.println(jsonData.floatValue);
      else if (jsonData.typeNum == FirebaseJson::JSON_DOUBLE)
        printf("%.9lf\n", jsonData.doubleValue);
      else if (jsonData.typeNum == FirebaseJson::JSON_STRING ||
               jsonData.typeNum == FirebaseJson::JSON_NULL ||
               jsonData.typeNum == FirebaseJson::JSON_OBJECT ||
               jsonData.typeNum == FirebaseJson::JSON_ARRAY)
        Serial.println(jsonData.stringValue);
    }
  }
  else
  {
    Serial.println(data.payload());
  }
}
*/
