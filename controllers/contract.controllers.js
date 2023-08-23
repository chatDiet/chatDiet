import { ContractService } from '../services';

class ContractController {
  contractService = new ContractService();

  createContract = async (req, res) => {
    const { trainerId } = req.params;
    const userId = res.locals.userId;
    const createContract = await this.contractService.createContract(trainerId, userId);
    res.status(createContract.status).json(createContract.message);
  };

  getContract = async (req, res) => {
    const userId = res.locals.userId;
    const getContract = this.contractService.getContract(userId);
    res.status(getContract.status).json(getContract.message);
  };

  deleteContract = async (req, res) => {
    const { contractId } = req.params;

    const deleteContract = await this.contractService.deleteContract(contractId);
    res.status(deleteContract.status).json(deleteContract.message);
  };
}

export default ContractController;
