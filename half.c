#include <stdio.h>

#define SIZE 4

void simulateHalfAdder(int a, int b) {
    int circuit[SIZE];

    circuit[0] = a;
    circuit[1] = b;
    circuit[2] = circuit[0] ^ circuit[1];
    circuit[3] = circuit[0] & circuit[1];

    printf("\n--- Half Adder Circuit Result ---\n");
    printf("Input A [Index 0] : %d\n", circuit[0]);
    printf("Input B [Index 1] : %d\n", circuit[1]);
    printf("Sum     [Index 2] : %d  (A XOR B)\n", circuit[2]);
    printf("Carry   [Index 3] : %d  (A AND B)\n", circuit[3]);
    printf("---------------------------------\n");
}

void generateTruthTable() {
    int i;
    int truthTable[4][4] = {
        {0, 0, 0, 0},
        {0, 1, 0, 0},
        {1, 0, 0, 0},
        {1, 1, 0, 0}
    };

    printf("\n=== HALF ADDER TRUTH TABLE ===\n");
    printf("  A  |  B  || Sum | Carry\n");
    printf("-----|-----||-----|------\n");

    for (i = 0; i < 4; i++) {
        truthTable[i][2] = truthTable[i][0] ^ truthTable[i][1];
        truthTable[i][3] = truthTable[i][0] & truthTable[i][1];

        printf("  %d  |  %d  ||  %d  |   %d\n",
               truthTable[i][0], truthTable[i][1],
               truthTable[i][2], truthTable[i][3]);
    }
}

int main() {
    int choice, a, b;

    while (1) {
        printf("\n=== HALF ADDER SIMULATOR (ARRAY DS) ===\n");
        printf("1. Calculate Single Input (A, B)\n");
        printf("2. Generate Full Truth Table\n");
        printf("3. Exit\n");
        printf("Select option: ");
        scanf("%d", &choice);

        if (choice == 1) {
            printf("Enter Input A (0 or 1): ");
            scanf("%d", &a);
            printf("Enter Input B (0 or 1): ");
            scanf("%d", &b);

            if ((a == 0 || a == 1) && (b == 0 || b == 1)) {
                simulateHalfAdder(a, b);
            } else {
                printf("Error: Please enter binary digits (0 or 1) only.\n");
            }
        } else if (choice == 2) {
            generateTruthTable();
        } else if (choice == 3) {
            printf("Simulation terminated.\n");
            break;
        } else {
            printf("Invalid option. Try again.\n");
        }
    }

    return 0;
}
