import { StyleSheet } from "react-native";
import Colors from "../../../../themes/colors";
import Fonts from "../../../../themes/fonts";

export default StyleSheet.create({
    container: {
        width: "100%",
        flex: 1
    },
    viewIconClose: {
        zIndex: 999,
        textAlign: 'center',
        right: 15,
        bottom: 20,                                                    
        position: 'absolute'
    },
    tchIconClose: {
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center"
    },
    field: {
        color: Colors.grayFiord,
        borderColor: Colors.grayFiord,
        backgroundColor: "transparent",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 60,
        fontSize: 20,
        fontFamily: Fonts.type.base,
        paddingLeft: 10
    },
    fieldPicker: {
        display: "flex",
        color: Colors.grayFiord,
        backgroundColor: "transparent",
        alignItems: "center",
        height: 40,
        fontSize: 20,
        fontFamily: Fonts.type.base
    },
    fieldPassSMS: {
        color: Colors.grayFiord,
        borderColor: Colors.grayZambezi,
        backgroundColor: "transparent",
        borderBottomWidth: 2,
        height: 60,
        width: 40,
        fontSize: 40,
        fontFamily: Fonts.type.base,
        paddingLeft: 10
    },
    rounded: {
        borderRadius: 100,
        borderWidth: 1,
        borderColor: Colors.yellow
    },
    invalid: {
        // color: Colors.redAlizarin,
        borderColor: Colors.redAlizarin
        // backgroundColor: 'rgba(231, 53, 54, 0.1)'
    },
    errorMessage: {
        color: Colors.redAlizarin,
        fontSize: 18,
        fontFamily: Fonts.type.base,
        paddingLeft: 10
    },
    label: {
        fontSize: 20,
        textAlign: "left",
        color: Colors.yellowSelective,
        fontFamily: Fonts.type.base,
        paddingBottom: 5
    },
    hidePassword: {
        width: 48,
        height: 48,
        position: "absolute",
        right: 0,
        top: 35
    },
    forgotPassword: {
        color: Colors.grayFiord,
        lineHeight: 14,
        minHeight: 16,
        marginVertical: 5,
        fontFamily: Fonts.type.base
    },
    countdown: {
        textAlign: "center",
        fontFamily: Fonts.type.bold,
        fontSize: 15,
        color: Colors.blueCerulean
    },
    sendFile: {
        fontFamily: Fonts.type.base,
        textAlign: "center",
        color: Colors.blueCerulean
    },
    font: {
        fontFamily: Fonts.type.base,
        textAlign: "center",
        color: Colors.blueCerulean
    },
    loader: {
        backgroundColor: Colors.gray,
        borderRadius: 5.0
    },
    //cpfField component
    viewIconClear: {
        zIndex: 999,
        textAlign: 'center',
        right: 15,
        bottom: 20,
        position: 'absolute'
    },
    tchIconClear: {
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalStyle: {
        borderWidth: 0,
        borderBottomWidth: StyleSheet.hairlineWidth,
        margin: 0
    },
    modalTxtStyle: {
        fontFamily: Fonts.type.base,
        textAlign: "left",
        fontSize: 20
    },
    iconArrowDown: {
        position: "absolute", 
        right: 5, 
        bottom: 10 
    },
    //passwordField
    tchForgetPwd: {
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginTop: 20
    },
    //passSMS
    passSMSContainer:{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
        height: 110,
        padding: 20,
        flexDirection: "row"
    },
    viewPassSMSTxtIp1:{
        flex: 1
    },
    viewPassSMSTxtIp2: {
        marginLeft: 20 
    }


});
