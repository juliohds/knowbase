import React, { Component } from "react";
import { Text, TextInput, View, TouchableOpacity } from "react-native";
import styles from "./formFieldStyles";
import { Colors } from "../../../themes";
import ModalPicker from "../../ModalSelector";
import Loader from "../../loader/loader";
import Icon from "react-native-vector-icons/MaterialIcons";
import I18n from "react-native-i18n";

export default class FormField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valid: true,
            colorPicker: this.props.selectedValue ? true : false,
            optionalButtonText: I18n.t("seeMore"),
            stepModal: 1
        };
    }

    renderError() {
        if (this.props.error) {
            return <Text style={styles.errorMessage}>{this.props.error}</Text>;
        }
    }

    renderLabel() {
        if (this.props.title) {
            return (
                <Text style={[styles.label, { marginTop: 20, marginLeft: 6 }]}>
                    {this.props.title}
                </Text>
            );
        }
    }

    renderInput() {
        let {
            autoFocus,
            selection,
            canPaste = true,
            selectTextOnFocus,
            value,
            onChangeText,
            placeholderText,
            maxLength,
            keyboardType,
            isEditable = true,
            name,
            isDisabled = false,
            onEndEditing,
            returnKeyType,
            autoCorrect,
            autoCapitalize,
            autoCompleteType,
            refs
        } = this.props;

        if (!value) value = "";

        return (
            <View style={{ position: "relative" }}>
                <TextInput
                    ref={refs || refs}
                    blurOnSubmit={this.props.blurOnSubmit || true}
                    onSubmitEditing={() => {
                        if (this.props.onSubmitEditing)
                            this.props.onSubmitEditing();
                    }}
                    name={name}
                    placeholderTextColor={Colors.grayLight}
                    underlineColorAndroid={Colors.transparent}
                    style={[styles.field, this.props.style]}
                    disabled={isDisabled}
                    autoCompleteType={autoCompleteType}
                    autoCorrect={autoCorrect}
                    returnKeyType={returnKeyType}
                    editable={
                        isEditable !== null && isEditable !== undefined
                        ? isEditable
                        : true
                    }
                    selection={selection}
                    contextMenuHidden={!canPaste}
                    autoCapitalize={autoCapitalize}
                    selectTextOnFocus={selectTextOnFocus}
                    value={value.toString()}
                    autoFocus={autoFocus}
                    placeholder={placeholderText}
                    onChangeText={onChangeText}
                    maxLength={maxLength}
                    keyboardType={keyboardType}
                    onEndEditing={onEndEditing}
                />
                < View style={styles.viewIconClose} >
                    {this.props.refs && isEditable ? (
                        <TouchableOpacity 
                            style={ styles.tchIconClose }
                            onPress={() => {
                                if (this.props.refs) {
                                    this.props.dualRef 
                                    ? (
                                        this.props.refs.current.clear(), 
                                        this.props.refs2.current.clear()
                                    ) 
                                    : this.props.refs.current.clear();
                                    onChangeText("");
                                }
                            }}
                        >
                            {!this.props.contentOfdualRef && 
                            <Icon
                                name="close"
                                size={17}
                                color={value == "" ? Colors.grayLight : Colors.grayFiord}                                                                    
                            />
                            }
                        </TouchableOpacity>
                    ) : (
                        <></>
                    )}
                </View>
            </View>
        );
    }

    handleChangeColorPicker = () => {
        if (!this.state.colorPicker) {
            this.setState({ colorPicker: true });
        }
    };

    renderPicker() {
        const {
            onValueChange,
            favorites = null,
            firstItem,
            selectedValue,
            activePicker,
            optionalButton = false,
            placeholderText,
            cancelTextStyle = {color: Colors.red}
        } = this.props;
        
        var { itens } = this.props;
        const { colorPicker, optionalButtonText, stepModal } = this.state;
        if(favorites != null && stepModal == 1) {
            itens = favorites;
        }

        if (!itens) return null;

        let pikers = [];

        if (firstItem)
            pikers.push({ key: "0", section: true, label: firstItem });

        itens.forEach(item => {

            const { value } = item;
            pikers.push({
                key: value,
                ...item
            });
        });

        return (
            <View>
                <ModalPicker
                    data={pikers}
                    innerRef={ref => (this.newRef = ref)}
                    visible={this.props.visible || false}
                    cancelText={ I18n.t("cancelLabel") }
                    cancelTextStyle={cancelTextStyle}
                    optionalButtonText={optionalButtonText}
                    optionalButtonCallback={() => {
                        if(stepModal === 1)
                            this.setState({
                                ...this.state,
                                optionalButtonText: I18n.t("mainPl"),
                                stepModal: 2
                            });
                        else 
                            this.setState({
                                ...this.state,
                                optionalButtonText: I18n.t("seeMore"),
                                stepModal: 1});
                    }}
                    optionalButton={optionalButton}
                    selectedKey={selectedValue}
                    initValue={firstItem ? firstItem : placeholderText}
                    onChange={e => {
                        onValueChange(e);
                        this.handleChangeColorPicker();
                    }}
                    selectTextStyle={[styles.fieldPicker, this.props.style]}
                    onModalClose={() => {
                        if (this.props.onModalClose) this.props.onModalClose();
                    }}
                    selectStyle={styles.modalStyle}
                    selectTextStyle={[
                        styles.modalTxtStyle,
                        {color: colorPicker ? Colors.grayFiord : Colors.grayLight }                        
                    ]}
                />
                <Icon
                    style={styles.iconArrowDown}
                    name="keyboard-arrow-down"
                    size={25}
                    color={colorPicker ? Colors.grayFiord : Colors.grayLight}
                />
            </View>
        );
    }

    focus = () => {
        this.txtInput && this.txtInput.current.focus();
    };

    render() {
        let { pointerEvents, customStyle, type, loading } = this.props;

        if (!type) type = "input";

        return (
            <View
                pointerEvents={pointerEvents}
                style={[styles.container, customStyle]}
            >
                {this.renderLabel()}
                {loading && (
                    <Loader
                        style={ styles.loader }
                        color={ Colors.blueCerulean }
                        size="small"
                    />
                )}
                {!loading && type === "picker" && this.renderPicker()}
                {!loading && type === "input" && this.renderInput()}
                {!loading && this.renderError()}
            </View>
        );
    }
}
