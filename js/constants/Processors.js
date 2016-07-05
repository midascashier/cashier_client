/**
        * Created by fede
        */

        import Cashier from './Cashier';

        const NUM_OF_STEPS = "numOfSteps";
        const ROUTE = "route";

        let settings = [];

        settings[Cashier.PROCESSOR_ID_NETELLER] = [];
        settings[Cashier.PROCESSOR_ID_NETELLER][NUM_OF_STEPS] = 2;

        settings[Cashier.PROCESSOR_ID_BITCOIN] = [];
        settings[Cashier.PROCESSOR_ID_BITCOIN][NUM_OF_STEPS] = 3;

        export default {
        processorSettings: settings,
        NUM_OF_STEPS: 'test',
        ROUTE: 'abc'
        };