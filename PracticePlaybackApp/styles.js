import {StyleSheet}from "react-native";

export default StyleSheet.create({


    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
    
    

      headerText: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 20,
        marginTop: 20

    },

      songContainer: {
        width: "100%",
        marginTop: 20,

      },

      songHeader: {
          fontSize: 25,
          fontWeight: "bold"

      },

      songSubheader: {
          fontSize: 20,
          fontWeight: "600"
      },


        imageStyles: {
        width: 300,
        height: 200
        },

        selectedImageStyles: {
            marginBottom: 100,
            width: 300,
            height: 200
            },

        thumbnailStyles: {
            width: 250,
            height: 150
        },
    slider: {
        width: 200,
        height: 40
      },

    picker: {
        height: 40,
        width: 300,
        marginBottom: 100
    },
    spacedRow: {
        display: "flex",
        flexDirection: "row"
    },
    input : {
        width: "60%",
        borderWidth: 1,
        borderColor: "black",
        textAlign: "center"
    },

    libraryScroll: {
        height: "45%"
    },
    pageBottom: {
        marginTop: 40,
        display: "flex",
        justifyContent: "space-evenly",
        height: "30%"
    },

    button: {
        alignItems: "center",
        backgroundColor: "#737373",
        padding: 20,
        borderRadius: 20,
        
    },

    buttonText: {
        color: "#ffffff"
    },

    centerContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    }

    


});