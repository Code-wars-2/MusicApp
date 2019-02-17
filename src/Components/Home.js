import React from 'react';
import ReactPlayer from 'react-player';
import { Row , Col , Button , Card , Icon , Collapse , message , Spin , Tabs , Progress } from 'antd';
import { allSongs } from '../Sources/SongInfo';
import LinkinPark from '../Assets/LinkinPark.png';
import Metallica from '../Assets/Metallica.jpg';
import GunsNRoses from '../Assets/GunsNRoses.jpg';
import GreenDay from '../Assets/GreenDay.jpg';
import Maroon5 from '../Assets/Maroon5.jpg';


const images = [LinkinPark,Metallica,GunsNRoses,GreenDay,Maroon5]
const Panel = Collapse.Panel;
const body = document.getElementById('root');
const antIcon = <Icon type="loading" className="loader" spin />;
const TabPane = Tabs.TabPane;

class Home extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			currentURL:null,
			artist:null,
			song:null,
			bg:null,
			loading:true,
			played:0,
		}
	}

	componentDidMount(){
	}

	componentDidUpdate(prevProps , prevState){

	}

	setUrl = (artist,song,bg,e) => {
		this.setState({
			currentURL:e.target.value,
			playing:true,
			loading:true,
			bg,
			artist,
			song
		})
		// body.style.backgroundImage(images[bg].toString())
	}

	playOrPause = () => {
		this.setState({
			playing:!this.state.playing
		})
	}	

	renderPlayer = () => {
		if(this.state.currentURL){
			return (
				<Card className="player-controls">
					<div className="song-name">{this.state.song}</div>
					<div className="artist-name">{this.state.artist}</div>
					{this.state.playing ? this.state.loading ? <span><Icon className="pause-btn trans" type="pause-circle" theme="filled"/><Spin className="spinner" indicator={antIcon}/></span> : <Icon className="pause-btn" type="pause-circle" theme="filled" onClick={this.playOrPause}/> : <Icon className="play-btn" type="play-circle" theme="filled" onClick={this.playOrPause}/>}
					<Progress className="progress" type="line" percent={this.state.played} showInfo={false}/>
				</Card>)
		}
		else{
			return false;
		}	
	}

	getProgress = (e) => {
		this.setState({
			played:e.played*100
		})
		if(e.playedSeconds>0){
			this.setState({
				loading:false
			})
		}
		if(e.played===1){
			this.setState({
				currentURL:null,
				loading:true,
				played:0
			})
		}
	}

	handleError = (e) => {
		return (message.error("Failed to load Song!! Please try Again"))
	}



	render(){
		return(<div>
				<Tabs defaultActiveKey="1" className="tabs">
					{allSongs.map(genres=>{
						return <TabPane tab={genres.genre} key={genres.key}>
    					<div >
						{genres.list.map(artist=>{
							return (<Col xl={6} lg={6} md={8} sm={12} xs={24} className="artist-container">
									<div className="artist-inner-cont">
										<img className="img-logo" src={images[artist.imgUrl]} alt="Not Available"/>
										{artist.songs.map(isong => {
										return (<Button className="song-card" value={isong.url} onClick={this.setUrl.bind(this,artist.artist,isong.name,artist.imgUrl)}>
												<div>{isong.name}</div>
											</Button>)
										})}
									</div>
								</Col>)	
						})}	
						</div>
    				</TabPane>
					})}
  				</Tabs>

				{this.renderPlayer()}
				<ReactPlayer className="player" height="100px" url={this.state.currentURL} controls={false} playing={this.state.playing} onProgress={this.getProgress} onDuration={this.getDuration} onError={this.handleError} onReady={this.handleReady}/>
			</div>)
	}
}
export default Home