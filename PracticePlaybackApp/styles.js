import {StyleSheet}from "react-native";

export default StyleSheet.create({


    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },

      headerText: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20
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

        thumbnailStyles: {
            width: 250,
            height: 150
        },
    slider: {
        width: 200,
        height: 40
      },

    picker: {
        height: 50,
        width: 300,
        marginBottom: 200
    },
    spacedRow: {
        display: "flex",
        flexDirection: "row"
    },
    libraryScroll: {
        height: 500
    }
});