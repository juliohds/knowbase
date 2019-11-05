import { StyleSheet } from "react-native";
import { Colors } from "../../../themes";

export default StyleSheet.create({
    UploadFilesContainer:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center" 
    },

    viewIntroduction:{
        padding: 20,
        justifyContent: "center",
        alignItems: "center"
    },

    imgSelfie:{
        width: 120, 
        height: 120 
    },
    
    txtIntroduction:{
        color: Colors.grayWarm,
        fontSize: 18,
        textAlign: "center",
        fontWeight: "700"
    },

    //imageContentUpload
    imgUploadContainer:{
        width: "100%",
        justifyContent: "center",
        alignItems: "flex-start"
    },

    txtCPFIfNot:{
        textAlign: "left",
        paddingVertical: 10,
        color: Colors.grayWarm
    },

    viewTxtArea:{
        width: "100%" 
    },
    
    txtTop:{
        fontWeight: "700",
        textAlign: "left",
        width: "100%",
        fontSize: 14,
        marginTop: 20,
        marginBottom: 20,
        color: Colors.blueCerulean
    },

    viewTopDesc:{
        borderBottomColor: Colors.grayWarm,
        borderBottomWidth: 1
    },

    txtTopDesc:{
        color: Colors.grayWarm,
        marginBottom: 25
    },

    viewUploadedIgmArea:{
        width: "100%",
        height: 120,
        paddingVertical: 10,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        borderTopColor: Colors.grayWarm,
        borderBottomColor: Colors.grayWarm,
        borderBottomWidth: 1
    },

    imgUploaded:{
        width: 30, 
        height: 30 
    },

    viewFileName:{
        flex: 1  
    },

    txtFileName:{
        fontSize: 14,
        marginLeft: 15,
        color: Colors.blueCerulean
    },

    viewImgPreview:{
        alignItems: "flex-end",
        justifyContent: "flex-end",
        flexDirection: "row"
    },
    viewBttTxt:{
        marginTop: -40, 
        marginBottom: 50
    },

    //imagePreview
    imgPreviewContainer:{
        justifyContent: "center",
        marginLeft: 10,
        alignItems: "center"
    },

    viewIndicate:{
        borderWidth: 1,
        borderRadius: 2,
        borderColor: Colors.blueCerulean
    },
    
    imgIndicate:{
        width: 50,
        height: 60
    },

    txtDocLabel:{
        textAlign: "center",
        width: "100%",
        marginTop: 5,
        color: Colors.blueCerulean
    },

    //photoUpload
    photoUploadContainer:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },

    //uploadFilesOnBoarding
    uploadFilesContainer:{
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
    },

    txtTitle:{
        textAlign: "center",
        marginBottom: 20,
        fontSize: 26,
        marginTop: 20,
        fontWeight: "bold",
        color: Colors.blueCerulean 
    },
    imgUpload:{
        width: 350,
        height: 350
    },

    viewBtnRounded:{
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        flexDirection: "row",
        padding: 20,
        marginBottom: 10,
    },

    btnRounded: { 
        marginTop: 20,
        width: "45%"
    }
















})