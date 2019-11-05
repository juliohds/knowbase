import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import ImageContentUpload from "./imageContentUpload";
import { documents, documentsIndicate } from "../../api/mockService";
import Loader from "../loader/loader";
import Images from "../../themes/images";
import styles from './styles'

export default class UploadFilesOnBording extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            files: []
        };
    }

    componentDidMount() {
        if (this.props.indicate) {
            this.setState({ loading: false, files: documentsIndicate });
        } else {
            this.setState({ loading: false, files: documents });
        }
    }

    render() {
        const { loading, files } = this.state;
        const { indicate, textIntroduction } = this.props;
        return loading ? (
            <Loader />
        ) : (
            <View style={ styles.UploadFilesContainer }>
                {files.map((file, index) => {
                    return (
                        <View key={`uploadFilesOnBoarding-${index}`}>
                            {textIntroduction && index === 0 && (
                                <View style={ styles.viewIntroduction }>
                                    <Image
                                        source={Images.selfie}
                                        style={ styles.imgSelfie}
                                    />
                                    <Text style={ styles.txtIntroduction }>
                                        {textIntroduction}
                                    </Text>
                                </View>
                            )}
                            <ImageContentUpload
                                bottomText={file.bottomText}
                                topText={file.topText}
                                topDesc={file.topDesc}
                                indicate={indicate}
                                file={file}
                                helpIndex={index}
                                key={`${file.name}${index}`}
                            />
                        </View>
                    );
                })}
            </View>
        );
    }
}
