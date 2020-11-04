import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: Request): Transaction {
    // TODO
    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    if (value <= 0) {
      throw Error('Invalid value for transaction');
    }

    const balance = this.transactionsRepository.getBalance();

    if (balance.total - value < 0) {
      throw Error('Invalid balance');
    }

    return transaction;
  }
}

export default CreateTransactionService;
