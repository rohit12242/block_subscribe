import React, { useState } from 'react';
import useForceUpdate from 'use-force-update';

import { Button, Box, Stack, Divider, Typography } from "@material-ui/core"
import Web3 from "web3";

// let subscription;
export default function Home() {
    const forceUpdate = useForceUpdate();
    const [showSubscribebtn, setshowSubscribebtn] = useState(true)
    const [sub, setsub] = useState()
    const [blockData, setblockData] = useState({
        blockNumber: 0,
        minerAddress: "",
        difficulty: "",
        timestamp: 0
    })
    const getBlockchianData = () => {
        
        const web3 = new Web3("wss://mainnet.infura.io/ws/v3/8b2159b7b0944586b64f0280c927d0a8")
        console.log("value of web3:::", web3);

        let subscription = web3.eth.subscribe('newBlockHeaders', function (error, result) {
            if (!error) {
                console.log("value of result::", result);
                setsub(subscription)
                return;
            }

            console.error(error);
        })
            .on("connected", function (subscriptionId) {
                console.log("value of subscriptionid::", subscriptionId);
            })
            .on("data", function (blockHeader) {
                let tempObj = blockData;
                tempObj.blockNumber = blockHeader.number;
                tempObj.minerAddress = blockHeader.miner;
                tempObj.difficulty = blockHeader.difficulty;
                tempObj.timestamp = blockHeader.timestamp;
                setblockData(tempObj)
                forceUpdate();
                console.log("value of blockheader:::", blockHeader);
            })
            .on("error", console.error);

            setshowSubscribebtn(!showSubscribebtn);


    }

    const stopBlockchainData = () => {
        
        sub.unsubscribe(function (error, success) {
            if (success) {
                console.log('Successfully unsubscribed!');
            }
        })
        setshowSubscribebtn(!showSubscribebtn);
    }


    return (
        <>
            {showSubscribebtn === true ?
                <Box style={{ marginTop: '10%', marginLeft: '22%', marginRight: '22%', border: '1px solid rgba(255,255,255,0.3' }}>
                    <Typography variant='h3' sx={{mt:2,ml:2,mr:2,mb:2}}>Click on Subscribe to see latest block data</Typography>
                </Box>
                :
                <Box style={{ marginTop: '10%', marginLeft: '22%', marginRight: '22%', border: '1px solid rgba(255,255,255,0.3' }}>
                    <Stack direction='row' sx={{ mt: 2, ml: 4, mr: 4 }}>
                        <Typography variant='body1'>BlockNumber</Typography>
                        <Divider sx={{ flexGrow: 1, border: "0.5px dashed rgba(255, 255, 255, 0.3)", height: '0px' }} style={{ marginTop: '10px' }} />
                        <Typography>{blockData.blockNumber}</Typography>
                    </Stack>
                    <Stack direction='row' sx={{ mt: 2, ml: 4, mr: 4 }}>
                        <Typography variant='body1'>TimeStamp</Typography>
                        <Divider sx={{ flexGrow: 1, border: "0.5px dashed rgba(255, 255, 255, 0.3)", height: '0px' }} style={{ marginTop: '10px' }} />
                        <Typography>{blockData.timestamp}</Typography>
                    </Stack>
                    <Stack direction='row' sx={{ mt: 2, ml: 4, mr: 4 }}>
                        <Typography variant='body1'>Miner Address</Typography>
                        <Divider sx={{ flexGrow: 1, border: "0.5px dashed rgba(255, 255, 255, 0.3)", height: '0px' }} style={{ marginTop: '10px' }} />
                        <Typography>{blockData.minerAddress}</Typography>
                    </Stack>
                    <Stack direction='row' sx={{ mt: 2, mb: 2, ml: 4, mr: 4 }}>
                        <Typography variant='body1'> Difficulty</Typography>
                        <Divider sx={{ flexGrow: 1, border: "0.5px dashed rgba(255, 255, 255, 0.3)", height: '0px' }} style={{ marginTop: '10px' }} />
                        <Typography>{blockData.difficulty}</Typography>
                    </Stack>
                </Box>
            }

            <Stack sx={{ mt: 4 }}>
                {showSubscribebtn === true ?
                    <Button variant='contained' style={{ marginLeft: '42%', marginRight: '42%' }} onClick={() => getBlockchianData()}>Subscribe</Button>
                    :
                    <Button variant='contained' style={{ marginLeft: '42%', marginRight: '42%' }} onClick={() => stopBlockchainData()}>Unsubscribe</Button>

                }

            </Stack>
        </>
    );
}