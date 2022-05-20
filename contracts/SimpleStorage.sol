// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;

contract SimpleStorage {
  uint voteCountA = 0;
  uint voteCountB = 0;
  mapping(string => uint) public balances;

  function vote(uint x, string memory addr) public {
    balances[addr] = 2;
    if(x == 0){
      voteCountA++;
    }
    else{
      voteCountB++;
    }
  }

  

   function alreadyvoted(string memory addr) public view returns (uint) {
      if(balances[addr] == 2){
        return 1;
      }
      else{
        return 0;
      }
   }


  function get_A() public view returns (uint) {
    return voteCountA;
  }

  function get_B() public view returns (uint) {
    return voteCountB;
  }
}
