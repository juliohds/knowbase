import React, { Component } from "react";
import { Text, View, Image, Animated, TouchableOpacity, Easing } from "react-native";
import Images from "../../themes/images";
import styles from './styles';
import UploadImageModal from "./uploadImageModal";
import { setDocuments } from "../../redux/actions/solicitationActions";
import { bindActionCreators } from "redux";

import { connect } from "react-redux";

class ImagePreview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tapButton: false,
      modalVisible: false,
      yPosition: new Animated.Value(0),
    };
  }

  componentDidMount(){
    Animated.timing(this.state.yPosition, {
      toValue: 1,
      duration: 500,    
      useNativeDriver: true
    }).start();
  }

  renderImagePreview = () => {
    const { document } = this.props;

    if (document) {
      return (
        <View>
          <Text>{document.label}</Text>
        </View>
      );
    }
  };

  handleChangeModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  render() {
    const { document, indicate, indicatePerson, imageID } = this.props;
    return (
      <Animated.View style={[styles.imgPreviewContainer, { transform: [
        {
          translateX: this.state.yPosition.interpolate({
            inputRange: [0, 1],
            outputRange: [-600, 0]
          })
        }
      ],}]}>
        <View style={ styles.viewIndicate }>
          <TouchableOpacity onPress={() => this.handleChangeModal()}>
            <Image
              style={ styles.imgIndicate }
              resizeMode="cover"
              source={
                indicate
                  ? indicatePerson.documentsIndicate[imageID]
                    ? {
                        uri: `data:image/gif;base64,${
                          indicatePerson.documentsIndicate[imageID]
                        }`
                      }
                    : Images.emptyImg
                  : indicatePerson.documentsIndicator[imageID]
                  ? {
                      uri: `data:image/gif;base64,${
                        indicatePerson.documentsIndicator[imageID]
                      }`
                    }
                  : Images.emptyImg
              }
            />
          </TouchableOpacity>
        </View>
        <Text style={ styles.txtDocLabel }>
          {document.label}
        </Text>
        <UploadImageModal
          indicate={indicate}
          imageID={imageID}
          handleClose={this.handleChangeModal}
          modalVisible={this.state.modalVisible}
        />
      </Animated.View>
    );
  }
}

const mapStateToProps = state => ({
  solicit: state.solicitation,
  indicatePerson: state.indicate
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { setDocuments },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ImagePreview);
