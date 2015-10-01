# Virtual Network with two Subnets

<a href="https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Ftelmosampaio%2Fazure-templates%2Fmaster%2FIaaS-NSG-UDR-Before%2Fazuredeploy.json" target="_blank">
    <img src="http://azuredeploy.net/deploybutton.png"/>
</a>

<a href="http://armviz.io/#/?load=https://portal.azure.com/#create/Microsoft.Template/uri/https%3A%2F%2Fraw.githubusercontent.com%2Ftelmosampaio%2Fazure-templates%2Fmaster%2FIaaS-NSG-UDR-Before%2Fazuredeploy.json" target="_blank">
    <img src="http://armviz.io/visualizebutton.png"/>
</a>

This template allows you to create a Virtual Network with three subnets: DMZ, front end, and back end; Windows Server VMs in the DMZ and front end subnets; SQL Server 2014 VMs in the back end subnet; and NSGs to secure the front end and back end subnets. This template is used to support the environment used in the documentation found [here](https://azure.microsoft.com/documentation/articles/virtual-network-create-udr-arm-ps).

Below are the parameters that the template expects.

| Name   | Description    |
|:--- |:---|
| stdStorageName | Name for the standard storage account used to store vhds |
| stdStorageType | Type of storage for the standard storage account, defaults to Standard_LRS |
| prmStorageName | Name for the premium storage account used to store SSD vhds |
| prmStorageType | Type of storage for the premium storage account, defaults to Premium_LRS |
| vnetName | Name for the new virtual network |
| vnetPrefix | Address prefix for the Virtual Network specified in CIDR format |
| frontEndSubnetName | Name for front end subnet |
| frontEndSubnetPrefix | Prefix for the front end specified in CIDR format |
| backEndSubnetName | Name for back end subnet |
| backEndSubnetPrefix | Prefix for the back end specified in CIDR format |
| dmzSubnetName | Name for DMZ subnet |
| dmzSubnetPrefix | Prefix for the DMZ specified in CIDR format |
| webCount | Number of VMs in the front end subnet |
| sqlCount | Number of VMs in the back end subnet |
| fwCount | Number of VMs in the DMZ subnet |
| frontEndNSGName | Name for the NSG in the front end subnet |
| backEndNSGName | Name for the NSG in the back end subnet |

For more information on the scenario built wth this template, visit [this page](https://azure.microsoft.com/documentation/articles/virtual-network-create-udr-arm-template)
