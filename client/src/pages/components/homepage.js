import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Select } from '@chakra-ui/react'

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { ColorExtractor } from 'react-color-extractor';
import Image from 'next/image';

import html2canvas from 'html2canvas';

const Homepage = () => {
    const [data, setData] = useState(null);
    const [selectedValue, setSelectedValue] = useState(null);
    const fiscalYear = ['2078-2079', '2079-2080', '2080-2081', '2081-2082', '2082-2083']

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [companyName, setCompanyName] = useState('');
    const [companyLogo, setCompanyLogo] = useState(null);
    const [cash, setCash] = useState('');
    const [bonus, setBonus] = useState('');
    const [extractedColors, setExtractedColors] = useState([]);
    const [imageSrc, setImageSrc] = useState(null);
    const [dominantColor, setDominantColor] = useState(null);

    const [imageToCanvas, setImageToCanvas] = useState('');

    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const targetRef = useRef(null);

    const handleCompanyNameChange = (event) => {
        setCompanyName(event.target.value);
    };

    const convertToImage = () => {
        const node = targetRef.current;
        html2canvas(node, { useCORS: true })
            .then((canvas) => {
                // Convert canvas to data URL
                const dataUrl = canvas.toDataURL();
                const a = document.createElement('a');
                a.href = dataUrl;
                a.download = 'image.png';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            })
            .catch((error) => {
                console.error('Conversion failed:', error);
            });
    };

    const handleCashChange = (event) => {
        setCash(event.target.value);
    };

    const handleBonusChange = (event) => {
        setBonus(event.target.value);
    };

    const calculateTotal = () => {
        // Convert input values to numbers, assuming they are percentages
        const cashValue = parseFloat(cash) || 0;
        const bonusValue = parseFloat(bonus) || 0;

        // Calculate the total
        const totalValue = cashValue + bonusValue;

        // Return the formatted value as a string with two decimal places
        return totalValue.toFixed(2) + '%';
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
        console.log('Dominant Colors:', dominantColor);
    };

    const handleSubmit = async () => {
        try {
            const formData = new FormData();
            formData.append('companyName', companyName);
            formData.append('companyLogo', companyLogo);
            formData.append('cash', cash);
            formData.append('bonus', bonus);

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

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const selectedObject = data?.find((item) => item.name === selectedValue);

    const runColorExtractor = () => {
        if (selectedObject) {
            const imageUrl = `http://localhost:3001/${selectedObject.logoPath}`;
            console.log(imageUrl)
            setImageSrc(imageUrl);
            return <ColorExtractor src={imageUrl} getColors={handleColors} />;
        }
        return null;
    };

    // Run ColorExtractor when companyName or selectedObject changes
    useEffect(() => {
        console.log("here")
        runColorExtractor();
    }, [companyName, selectedObject]);

    useEffect(() => {
        // Make a GET request when the component mounts
        axios.get('http://localhost:3001/api/data')
            .then(response => {
                // Update the state with the data from the server
                setData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div>
            <div>
            </div>
            <div className='flex flex-col justify-center items-center h-screen'>
                <div>
                    <h1>SELECT a company name.</h1>
                    <div>
                        <Select className='mt-2' placeholder='Select option' onChange={handleSelectChange}>
                            {data && data.map(item => (
                                <option key={item.number} value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                            <ColorExtractor src={imageSrc} getColors={handleColors} />
                        </Select>
                    </div>
                </div>

                <div ref={targetRef} className="relative w-96 h-[500px] mt-4 mb-2">
                    <div
                        className="absolute inset-0 bg-gradient-to-b from-repeating-radial-0 to-repeating-radial-10 via-transparent from-[#e5e5f7] to-[#e5e5f7] border border-black h-full w-full rounded-lg"
                        style={{
                            backgroundImage: 'repeating-radial-gradient( circle at 0 0, transparent 0, #e5e5f7 10px ), repeating-linear-gradient( #444cf755, #444cf7 )',
                            opacity: '0.3',
                            zIndex: -1,
                            background: dominantColor
                        }}
                    />
                    <div>
                        <div>
                            {/* Dividend ANNOUNCEMENT  */}
                            <div className='flex justify-center items-center mt-10'>
                                <h1 className='text-xl text-white rounded-lg font-semibold bg-gray-900 p-2 w-fit'>DIVIDEND ANNOUNCEMENT</h1>
                            </div>

                            {/* Logo  */}
                            <>
                                {selectedObject ? (
                                    <div className='flex justify-center items-center mt-2'>
                                        <div className='flex justify-center w-40 h-36 -z-10'>
                                            <Image src={`http://localhost:3001/${selectedObject.logoPath}`} width={100} height={100} alt='LOGO' style={{ width: '150px', height: '150px' }} />
                                        </div>
                                    </div>
                                ) : (
                                    <div className='flex justify-center items-center mt-2'>
                                        <div className='flex justify-center rounded-lg border border-yellow-600 h-36 w-40'>
                                        </div>
                                    </div>
                                )}
                            </>

                            {/* Fiscal Year */}
                            <div>
                                <div className='mt-2 p-2 flex justify-center items-center space-x-2 border-2 border-black mx-12 rounded-bl-sm rounded-tr-sm rounded-3xl'>
                                    <h1 className='font-bold items-center'>FISCAL YEAR:</h1>
                                    <div>
                                        <Select
                                            className='text-black font-bold outline-none border border-none'
                                            placeholder='Select option'
                                            variant='unstyled'>
                                            {fiscalYear.map(item => (
                                                <option key={item} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </Select>
                                    </div>
                                </div>
                            </div>

                            {/* Cash */}
                            <div className='mt-5 flex justify-center items-center'>
                                <div className='w-fit p-[2px] rounded-3xl flex justify-center border border-yellow-600 space-x-2'>
                                    <h1 className='p-[2px] bg-slate-500 rounded-2xl flex justify-center items-center w-24 text-center font-bold'>
                                        CASH
                                    </h1>
                                    <input
                                        className='p-[2px] w-16 text-center font-bold rounded-2xl outline-none'
                                        placeholder='10.10%'
                                        value={cash}
                                        onChange={handleCashChange}
                                    />
                                </div>
                            </div>

                            {/* Bonus */}
                            <div className='mt-2 flex justify-center items-center'>
                                <div className='w-fit p-[2px] rounded-3xl flex justify-center border border-yellow-600 space-x-2'>
                                    <h1 className='p-[2px] bg-slate-500 rounded-2xl flex justify-center items-center w-24 text-center font-bold'>
                                        BONUS
                                    </h1>
                                    <input
                                        className='p-[2px] w-16 text-center font-bold rounded-2xl outline-none'
                                        placeholder='10.10%'
                                        value={bonus}
                                        onChange={handleBonusChange}
                                    />
                                </div>
                            </div>


                            {/* Total */}
                            <div className='mt-2 flex justify-center items-center'>
                                <div className='w-fit p-[2px] rounded-3xl flex justify-center border-2 border-yellow-600 space-x-2'>
                                    <h1 className='p-[2px] bg-slate-800 text-white rounded-2xl flex justify-center items-center w-24 text-center font-bold'>
                                        TOTAL
                                    </h1>
                                    <input className='p-[2px] text-gray-700 w-16 text-center font-bold rounded-2xl outline-none'
                                        placeholder='20.20%'
                                        value={calculateTotal()}
                                        readOnly
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className='z-60 space-x-5'>
                    <Button
                        className='bg-black p-2 text-white rounded-lg w-24 text-center'
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
                                </FormControl>
                                {/* <div>
                                    <h4>Extracted Colors:</h4>
                                    <ul>
                                        {extractedColors.map((color, index) => (
                                            <div key={index}>
                                                <li style={{ backgroundColor: color }}>{color}</li>
                                            </div>
                                        ))}
                                    </ul>
                                </div> */}
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
                                    Save
                                </Button>
                                <Button onClick={onClose}>Cancel</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                    <Button
                        className='bg-gray-800 p-2 text-white rounded-lg w-24 text-center'
                        onClick={convertToImage}
                    >
                        Download
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
