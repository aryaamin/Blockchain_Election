import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { storageValueA: 0, storageValueB: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      const instance = new web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExampleA = async () => {
    const { accounts, contract } = this.state;

    const avoted = await contract.methods.alreadyvoted(accounts[0]).call();

    if(avoted == 1){
      document.getElementById("avt").innerHTML = "ALREADY VOTED";
      document.getElementById("avt").style.color = "red"; 
    }

    else{


    // Stores a given value, 5 by default.
    await contract.methods.vote(0,accounts[0]).send({ from: accounts[0] });

    console.log(typeof(accounts[0]));

    // Get the value from the contract to prove it worked.
    const response_A = await contract.methods.get_A().call();
    const response_B = await contract.methods.get_B().call();

    // Update state with the result.
    this.setState({ storageValueA: response_A });
    this.setState({ storageValueB: response_B });

    document.getElementById("avt").innerHTML = "SUCCESSFULL";
    document.getElementById("avt").style.color = "green"; 
    }
    
  };

  runExampleB = async () => {

    

    

    const { accounts, contract } = this.state;

    const avoted = await contract.methods.alreadyvoted(accounts[0]).call();

    if(avoted == 1){
      document.getElementById("avt").innerHTML = "ALREADY VOTED";
      document.getElementById("avt").style.color = "red"; 
    }

    else{

    // Stores a given value, 5 by default.
    await contract.methods.vote(1,accounts[0]).send({ from: accounts[0] });

    // Get the value from the contract to prove it worked.
    const response_A = await contract.methods.get_A().call();
    const response_B = await contract.methods.get_B().call();

    // Update state with the result.
    this.setState({ storageValueA: response_A });
    this.setState({ storageValueB: response_B });

    document.getElementById("avt").innerHTML = "SUCCESSFULL";
    document.getElementById("avt").style.color = "green"; 
    }
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">

        <h2>ELECTION</h2>

        <div>Candidate A: {this.state.storageValueA}</div>
        <br/>
        <div>Candidate B: {this.state.storageValueB}</div>
        <br/>

        <button type="submit" onClick={this.runExampleA}>Vote A</button>
        <button type="submit" onClick={this.runExampleB}>Vote B</button>
        <h3 id="avt" ></h3>
      </div>
    );
  }
}

export default App;
