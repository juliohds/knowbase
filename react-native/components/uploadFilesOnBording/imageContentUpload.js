import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import ImagePreview from "./imagePreview";
import Images from "../../themes/images";
import I18n from "react-native-i18n";
import styles from "./styles";

export default class ImageContentUpload extends Component {
    
    getImageByName = name => {        
        if (name === "CNH ou RG" || name === "CPF") {
            return Images.docCNH;
        } else if (name === "Comprovante de Endereco") {
            return Images.locationIcon;
        } else if (name === "Foto do rosto") {
            return Images.selfieIcon;
        } else if (name === "Extrato bancário") {
            return Images.bankStatement;
        } else if (name === "Contra cheque") {
            return Images.groupDocuments;
        } else {
            return Images.docCNH;
        }
    };

    render() {
        const {
            file,
            indicate,
            topText,
            topDesc,
            bottomText,
            helpIndex
        } = this.props;

        return (
            <View style={ styles.imgUploadContainer }>
                {file.name === "CPF" && (
                    <Text style={ styles.txtCPFIfNot }>
                        { I18n.t("cpfEnterNumberIfNot") }
                    </Text>
                )}
                {topText && (
                    <View style={ styles.viewTxtArea }>
                        <Text style={ styles.txtTop }>
                            {topText}
                        </Text>
                        {topDesc && (
                            <View style={ styles.viewTopDesc }>
                                <Text style={ styles.txtTopDesc }>
                                    {topDesc}
                                </Text>
                            </View>
                        )}
                    </View>
                )}

                <View
                    style={{
                        ...styles.viewUploadedIgmArea,
                        borderTopWidth: helpIndex === 0 ? 1 : 0
                    }}
                >
                    <View>
                        <Image
                            source={this.getImageByName(file.name)}
                            style={ styles.imgUploaded }
                        />
                    </View>

                    <View style={ styles.viewFileName }>
                        <Text style={ styles.txtFileName }>
                            {file.name}
                        </Text>
                    </View>
                    <View style={ styles.viewImgPreview}>
                        {file.itensDocumento.map((doc, index) => {
                            return (
                                <ImagePreview
                                    indicate={indicate}
                                    imageID={doc.imageID}
                                    key={`previeW-${index}`}
                                    document={doc}
                                />
                            );
                        })}
                    </View>
                </View>
                {bottomText && (
                    <View style={ styles.viewBttTxt }>
                        <Text>{bottomText}</Text>
                    </View>
                )}                
            </View>
        );
    };
};
