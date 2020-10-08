package main

// Absolute : Finds Absolute value of an int
func Absolute(x int) int {
	if x < 0 {
		return -x
	}
	return x
}

// Remove: Removes int at specified index
func remove(slice []int, s int) []int {
	return append(slice[:s], slice[s+1:]...)
}

func main() {

	// scenario1()
	// scenario2()
	// scenario3()
	// scenario4()

}
