import { ContractService } from '../services';

class ContractController {
  contractService = new ContractService();

  createContract = async (req, res) => {
    const { trainerId } = req.body;
    const userId = res.locals.userId;
    const createContract = await this.contractService.createContract(trainerId, userId);
    return res.status(createContract.status).json(createContract.message);
  };

  getContract = async (req, res) => {
    const userId = res.locals.userId;
    const getContract = await this.contractService.getContract(userId);
    return res.status(getContract.status).json(getContract.message);
  };

  deleteContract = async (req, res) => {
    const { contractId } = req.params;
    const userId = res.locals.userId;

    const deleteContract = await this.contractService.deleteContract(contractId, userId);
    return res.status(deleteContract.status).json(deleteContract.message);
  };

  authContract = async (req, res) => {
    const { data } = req.body;

    const userId = res.locals.userId;

    const result = await this.contractService.authContract(data, userId);
    return res.status(result.status).json(result.message);
  };
}

export default ContractController;
