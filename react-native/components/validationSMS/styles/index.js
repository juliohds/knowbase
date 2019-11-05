import { StyleSheet } from 'react-native'
import { Colors } from '../../../themes';

export default StyleSheet.create({
    viewSMSValid:{
        width: "100%", 
        marginTop: 20
    },

    viewSMSForm:{
        width: "100%",
        marginTop: 0,
        paddingBottom: 20,
        justifyContent: "center",
        alignItems: "center"
    },

    txtSMSValidation:{
        color: Colors.grayZambezi,
        fontSize: 30,
        fontWeight: "700"   
    },

    txtGeneral:{
        color: Colors.grayZambezi 
    }

});