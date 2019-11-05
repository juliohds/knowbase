import React, { Component } from "react";
import { View, Dimensions, Text, Keyboard } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const { width, height } = Dimensions.get("window");
import { Colors } from "../../themes";
import CodeInput from "react-native-confirmation-code-field";
import I18n from "react-native-i18n";
import styles from './styles';
import { logEvent, events } from "../../analytics/index";

export default class ValidationSMS extends Component {
    constructor(props) {
        super(props);
        this.state = {
            size: { width, height }
        };
    }

    handlerOnFulfill = code => {
        Keyboard.dismiss();
        logEvent(events.validacaoContinuarAgente)
        this.props.onChangeText("codigo", code);
    };

    replacePhone = phone => {
        let first = phone.substring(0, 5);
        let final = phone.substring(11, 15);
        let newPhone = `${first}**** ${final}`;
        return newPhone;
    };

    containerProps = { style: { color: Colors.grayFiord } };

    render() {
        const { cellPhone } = this.props;
        return (
            <View style={ styles.viewSMSValid }>
                <View style={ styles.viewSMSForm }>
                    <Icon
                        name="cellphone-message"
                        size={60}
                        color={Colors.grayZambezi}
                    />
                    <Text style={ styles.txtSMSValidation }>
                        { I18n.t("SMSvalidation") }
                    </Text>
                    <Text style={ styles.txtGeneral}>
                        { I18n.t("SMSEnterCodeSent") }
                    </Text>
                    <Text style={{ ...txtGeneral , marginBottom: 20 }}>
                        { I18n.t("SMSByto") } {this.replacePhone(cellPhone)}
                    </Text>

                    <CodeInput
                        onFulfill={e => this.handlerOnFulfill(e)}
                        codeLength={6}
                        cellBorderWidth={2}
                        keyboardType="numeric"
                        activeColor={Colors.blackCoal}
                        inactiveColor={ Colors.gray }
                        variant="border-b"
                        size={45}
                        autoFocus={true}
                        blurOnSubmit="false"
                        cellProps={this.containerProps}
                    />
                </View>
            </View>
        );
    }
}


