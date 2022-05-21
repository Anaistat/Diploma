import React, {FC, useContext, useEffect, useState} from 'react';
import "./productChose.scss"
import {Paper} from "@mui/material";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import {categories} from "../../../utilities/categories";
import {Product} from "../../../types";
import ReviewService from "../../../services/ReviewService";
import {useDispatch, useSelector} from "react-redux";

const ProductChose:FC = () => {

    interface TabPanelProps {
        children?: React.ReactNode;
        index: number;
        value: number;
    }

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const [value, setValue] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [products, setProducts] = useState<Product[]>([])
    const [load, setLoad] = useState<boolean>(true)
    const dispatch = useDispatch()
    const singleProduct:any = useSelector<any>(state=>state.chosenProduct.product)
    const games = products.filter(product=>product.category === 'Game')
    const books = products.filter(product=>product.category === 'Book')
    const films = products.filter(product=>product.category === 'Film')

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    function TabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    function renderRowGames(props: ListChildComponentProps) {
        const { index, style } = props;

        return (
            <ListItem style={style} key={index} component="div" disablePadding>
                <ListItemButton onClick={()=>dispatch({type: 'CHOSEN_PRODUCT', payload: games[index]})}>
                    <p>{games[index]?.title}</p>
                </ListItemButton>
            </ListItem>
        );
    }
    function renderRowBooks(props: ListChildComponentProps) {
        const { index, style } = props;

        return (
            <ListItem style={style} key={index} component="div" disablePadding>
                <ListItemButton onClick={()=>dispatch({type: 'CHOSEN_PRODUCT', payload: books[index]})}>
                    <p>{books[index]?.title}</p>
                </ListItemButton>
            </ListItem>
        );
    }
    function renderRowFilms(props: ListChildComponentProps) {
        const { index, style } = props;

        return (
            <ListItem style={style} key={index} component="div" disablePadding>
                <ListItemButton onClick={()=>dispatch({type: 'CHOSEN_PRODUCT', payload: films[index]})}>
                    <p>{films[index]?.title}</p>
                </ListItemButton>
            </ListItem>
        );
    }

    useEffect(()=>{
        ReviewService.getAllProducts().then(res=> {
            setProducts(res)
            dispatch({type: 'CHOSEN_PRODUCT', payload: res[0]})
            setLoad(false)
        }).catch(err=>{
            console.warn(err)
            setLoad(false)
        })
    }, [])


            if (load){
                return(
                    <p>Loading...</p>
                )
            }
            else{
                if(singleProduct){
                    return (
                        <Paper className="product-container" elevation={2} style={{
                            background: `linear-gradient(to right, rgba(0,0,0,.4), rgba(0,0,0,.4)), url(${singleProduct.image})`,
                        }}>
                            <div className="product-container__type" style={ {
                                backgroundImage: `url(${categories[singleProduct.category]})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'
                            } }/>
                            <div className="product-container__panel" style={ {
                                backgroundImage: "url('https://res.cloudinary.com/dighqotqh/image/upload/v1653121754/reccom/card_srkout.png')"
                            } }>
                                <h2 className="name-to-change">{singleProduct.title}</h2>
                                <span className="change-product" onClick={()=>setIsModalOpen(prev=>!prev)}>Change title</span>
                            </div>
                            <div className={isModalOpen?"modal-choose-product open":"modal-choose-product close"}>
                                <button className="modal-close-button" type="button" onClick={()=>setIsModalOpen(prev=>!prev)}>x</button>
                                <Box sx={{ width: '100%' }}>
                                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                            <Tab label="Games" {...a11yProps(0)} />
                                            <Tab label="Books" {...a11yProps(1)} />
                                            <Tab label="Films" {...a11yProps(2)} />
                                        </Tabs>
                                    </Box>
                                    <TabPanel value={value} index={0}>
                                        <Box
                                            sx={{ width: '100%', height: 400, bgcolor: 'background.paper' }}
                                        >
                                            <FixedSizeList
                                                height={420}
                                                width={480}
                                                itemSize={46}
                                                itemCount={games.length}
                                                overscanCount={5}
                                            >
                                                {renderRowGames}
                                            </FixedSizeList>
                                        </Box>
                                    </TabPanel>
                                    <TabPanel value={value} index={1}>
                                        <Box
                                            sx={{ width: '100%', height: 400, bgcolor: 'background.paper' }}
                                        >
                                            <FixedSizeList
                                                height={420}
                                                width={480}
                                                itemSize={46}
                                                itemCount={books.length}
                                                overscanCount={5}
                                            >
                                                {renderRowBooks}
                                            </FixedSizeList>
                                        </Box>
                                    </TabPanel>
                                    <TabPanel value={value} index={2}>
                                        <Box
                                            sx={{ width: '100%', height: 400, bgcolor: 'background.paper' }}
                                        >
                                            <FixedSizeList
                                                height={420}
                                                width={480}
                                                itemSize={46}
                                                itemCount={films.length}
                                                overscanCount={5}
                                            >
                                                {renderRowFilms}
                                            </FixedSizeList>
                                        </Box>
                                    </TabPanel>
                                </Box>
                            </div>
                        </Paper>
                    );
                }
                else{
                    return(
                        <p>Error loading data</p>
                    )
                }
            }
};

export default ProductChose;


