import React, { Component } from "react";
import {
    View,
    Text,
    Image
} from "react-native";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PhotoUpload from "./photoUpload";
import Images from "../../themes/images";
import { setDocuments } from "../../redux/actions/solicitationActions";
import RoundedButton from "../buttons/roundedButton";
import BaseModal from "../commons/baseModal";
import { ButtonStyle } from "../../themes/buttons";
import { ButtonSize } from "../buttons/styles/roundedButtonStyles";
import {
    setDocumentsIndicate,
    setDocumentsIndicator
} from "../../redux/actions/indicateActions";
import I18n from "react-native-i18n";
import styles from './styles'

let wasClicked = false;
let titles = [ I18n.t("imageSharp") ,  I18n.t("selectImage")];

class UploadImageModal extends Component {
    constructor(props) {
        super(props);
        const { indicatePerson, imageID } = this.props;
        this.state = {
            tapButton: false,
            first: false,
            onCancel: "",
            loading: false,
            title: this.setTitle(indicatePerson, imageID)
        };
    }
    setTitle = (indicatePerson, imageID) => {
        return indicatePerson.documentsIndicate[imageID] !== "" &&
            indicatePerson.documentsIndicate[imageID] !== undefined
            ? titles[0]
            : titles[1];
    };

    tapButtonOpen = () => {     
        setTimeout(() => {
            this.setState({ tapButton: true });
        }, 5);               
        wasClicked = false;
    };

    componentWillReceiveProps(props) {
        const { indicatePerson, indicate, imageID } = this.props;

        if (props.modalVisible) {
            if (indicate) {
                indicatePerson
                    ? indicatePerson.documentsIndicate[imageID] === "" ||
                      indicatePerson.documentsIndicate[imageID] === undefined
                        ? (wasClicked = true)
                        : null
                    : null;
            } else {
                indicatePerson
                    ? indicatePerson.documentsIndicator[imageID] === "" ||
                      indicatePerson.documentsIndicator[imageID] === undefined
                        ? (wasClicked = true)
                        : null
                    : null;
            }
        }
    }
    componentDidUpdate() {        
        if (wasClicked) {
            this.tapButtonOpen();
        }    
    }

    render() {
        const {
            handleClose,
            modalVisible,
            indicate,
            indicatePerson,            
            imageID
        } = this.props;
        const { loading } = this.state;
        return (
            <BaseModal
                gradiente={true}
                modalVisible={modalVisible}
                backgroundColorModal="transparent"
            >              
                <View style={ styles.uploadFilesContainer }>
                    <PhotoUpload
                        cameraType={"back"}
                        tapButton={this.state.tapButton}
                        onPhotoSelect={avatar => {
                            wasClicked = false;
                            this.setState({ tapButton: false });
                            if (avatar) {
                                if (indicate === true) {
                                    const NewArray = this.props.indicatePerson
                                        .documentsIndicate;
                                    NewArray[imageID] = avatar;
                                    this.setState({
                                        ...this.state,
                                        title: titles[0]
                                    });
                                    setDocumentsIndicate(NewArray);
                                } else {
                                    const NewArray = this.props.indicatePerson
                                        .documentsIndicator;
                                    NewArray[imageID] = avatar;
                                    this.setState({
                                        ...this.state,
                                        title: titles[0]
                                    });
                                    setDocumentsIndicator(NewArray);
                                }
                            }
                        }}
                        onResponse={() => {
                            wasClicked = false;
                        }}
                        onCancel={() => {
                            //this.setState({ tapButton: false });
                        }}
                        onStart={start => {
                            //this.setState({ loading: true });
                        }}
                        photoPickerTitle={ I18n.t("imageChoose") }
                        maxHeight={612}
                        quality={25}
                        maxWidth={612}
                    >
                        <Text style={ styles.txtTitle }>
                            {this.state.title}
                        </Text>
                        {!loading && (
                            <Image
                                style={ styles.imgUpload }
                                resizeMode="cover"
                                source={
                                    indicate
                                        ? indicatePerson.documentsIndicate[
                                              imageID
                                          ]
                                            ? {
                                                  uri: `data:image/gif;base64,${indicatePerson.documentsIndicate[imageID]}`
                                              }
                                            : Images.emptyImg
                                        : indicatePerson.documentsIndicator[
                                              imageID
                                          ]
                                        ? {
                                              uri: `data:image/gif;base64,${indicatePerson.documentsIndicator[imageID]}`
                                          }
                                        : Images.emptyImg
                                }
                            />
                        )}
                    </PhotoUpload>
                    <View
                        style={{
                            ...styles.viewBtnRounded,
                            display: this.state.title == titles[1] 
                                    ? "flex" 
                                    : "none"
                        }}
                    >
                        <RoundedButton
                            style={ styles.btnRounded }
                            buttonSize={ButtonSize.Large}
                            buttonStyle={ButtonStyle.Secondary}
                            text={ I18n.t("backTxt") }
                            onPress={() => {
                                this.setState({ tapButton: false }, 
                                    () => handleClose()
                                );
                            }}
                        />
                    </View>
                    <View
                        style={{
                            ...styles.viewBtnRounded,
                            display: this.state.title == titles[0] 
                                    ? "flex" 
                                    : "none"
                        }}
                    >
                        <RoundedButton
                            style={ styles.btnRounded }
                            buttonSize={ButtonSize.Large}
                            buttonStyle={ButtonStyle.Secondary}
                            text={ I18n.t("noAgain") }
                            onPress={() => this.setState({ tapButton: true })}
                        />
                        <RoundedButton
                            onPress={() => {
                                this.setState({ tapButton: false }, 
                                    () => handleClose()
                                );
                            }}
                            style={ styles.btnRounded }
                            buttonSize={ButtonSize.Large}
                            buttonStyle={ButtonStyle.Primary}
                            text={ I18n.t("yesProceed") }
                        />
                    </View>                   
                </View>
            </BaseModal>
        );
    }
}

const mapStateToProps = state => ({
    solicit: state.solicitation,
    indicatePerson: state.indicate
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            setDocuments,
            setDocumentsIndicate,
            setDocumentsIndicator
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadImageModal);
