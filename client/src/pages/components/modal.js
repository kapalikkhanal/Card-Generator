import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import React, { useRef, useState } from 'react';
import axios from 'axios';
import { ColorExtractor } from 'react-color-extractor';

function AddModal() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [companyName, setCompanyName] = useState('');
    const [companyLogo, setCompanyLogo] = useState(null);
    const [extractedColors, setExtractedColors] = useState([]);
    const [imageSrc, setImageSrc] = useState(null);
    const [dominantColor, setDominantColor] = useState(null);

    const initialRef = useRef(null);
    const finalRef = useRef(null);

    const handleCompanyNameChange = (event) => {
        setCompanyName(event.target.value);
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setCompanyLogo(file);

        const imageUrl = URL.createObjectURL(file);
        setImageSrc(imageUrl);
    };

    const handleColors = (colors) => {
        const dominantColor = findDominantColor(colors);
        setDominantColor(dominantColor);
        setExtractedColors(colors);
        console.log('Extracted Colors:', colors);
        console.log('Dominant Color:', dominantColor);
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('companyName', companyName);
            formData.append('companyLogo', companyLogo);

            // Make a POST request to the server with formData
            const response = await axios.post(
                'http://localhost:3001/api/addUser',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            console.log(response.data);
            onClose();
            setExtractedColors([]);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const findDominantColor = (colors) => {
        const colorCounts = {};
        colors.forEach((color) => {
            colorCounts[color] = (colorCounts[color] || 0) + 1;
        });

        // Find the color with the highest frequency (dominant color)
        let dominantColor = null;
        let maxCount = 0;

        Object.keys(colorCounts).forEach((color) => {
            if (colorCounts[color] > maxCount) {
                maxCount = colorCounts[color];
                dominantColor = color;
            }
        });

        return dominantColor;
    };

    return (
        <div>
            <Button
                className='bg-gray-800 p-2 text-white rounded-lg w-24 text-center'
                onClick={onOpen}
            >
                + Add
            </Button>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add a new company</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Company name</FormLabel>
                            <Input
                                ref={initialRef}
                                placeholder='Khalti'
                                value={companyName}
                                onChange={handleCompanyNameChange}
                            />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Company Logo</FormLabel>
                            <Input type='file' onChange={handleFileChange} />
                            <div>
                                <ColorExtractor src={imageSrc} getColors={handleColors} />
                            </div>
                        </FormControl>
                        <div>
                            <h4>Extracted Colors:</h4>
                            <ul>
                                {extractedColors.map((color, index) => (
                                    <div key={index}>
                                        <li style={{ backgroundColor: color }}>{color}</li>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}

export default AddModal;
