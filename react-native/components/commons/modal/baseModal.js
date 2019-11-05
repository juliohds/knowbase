import React, { Component } from "react";
import { Colors } from "../../../themes";
import { View, Modal, SafeAreaView } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import styles from "./styles";

class BaseModal extends Component {
    render() {
        const {
            modalVisible,
            gradiente,
            children,
            backgroundColorModal
        } = this.props;

        const genGradient = (gradiente) => {
            return ( 
                gradiente
                ? [ Colors.yellow, Colors.yellowSelective ]
                : [ Colors.white, Colors.white ]
            )
        };

        return (
            <>
                <Modal
                    animationType="fade"
                    transparent
                    visible={modalVisible}
                    onRequestClose={() => {}}
                >
                    <SafeAreaView style={ styles.safeView} />
                    <LinearGradient
                        colors={ genGradient(gradiente) }
                        style={ styles.linearGrad }
                    >
                        <View
                            style={[
                                styles.modalContainer,
                                {
                                    backgroundColor:
                                        backgroundColorModal ||
                                        Colors.blueDark_glassy
                                }
                            ]}
                        >
                            {children}
                        </View>
                    </LinearGradient>
                </Modal>
            </>
        );
    }
}

export default BaseModal;
