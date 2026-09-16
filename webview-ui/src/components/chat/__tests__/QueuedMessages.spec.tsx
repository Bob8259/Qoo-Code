import { render, screen, fireEvent } from "@/utils/test-utils"
import { QueuedMessages } from "../QueuedMessages"
import { QueuedMessage } from "@roo-code/types"

describe("QueuedMessages", () => {
	const mockQueue: QueuedMessage[] = [
		{
			id: "msg-1",
			text: "First queued instruction",
			timestamp: Date.now(),
		},
		{
			id: "msg-2",
			text: "Second queued instruction",
			timestamp: Date.now() + 1000,
		},
	]

	it("renders null when queue is empty", () => {
		const { container } = render(
			<QueuedMessages
				queue={[]}
				onRemove={vi.fn()}
				onUpdate={vi.fn()}
				onSteer={vi.fn()}
			/>,
		)
		expect(container.firstChild).toBeNull()
	})

	it("renders queued messages with Steer and Remove buttons", () => {
		render(
			<QueuedMessages
				queue={mockQueue}
				onRemove={vi.fn()}
				onUpdate={vi.fn()}
				onSteer={vi.fn()}
			/>,
		)

		expect(screen.getByText("First queued instruction")).toBeInTheDocument()
		expect(screen.getByText("Second queued instruction")).toBeInTheDocument()

		const steerButtons = screen.getAllByTestId("steer-message-button")
		expect(steerButtons).toHaveLength(2)
	})

	it("calls onSteer with index when Steer button is clicked", () => {
		const onSteer = vi.fn()
		render(
			<QueuedMessages
				queue={mockQueue}
				onRemove={vi.fn()}
				onUpdate={vi.fn()}
				onSteer={onSteer}
			/>,
		)

		const steerButtons = screen.getAllByTestId("steer-message-button")
		fireEvent.click(steerButtons[0])

		expect(onSteer).toHaveBeenCalledTimes(1)
		expect(onSteer).toHaveBeenCalledWith(0)

		fireEvent.click(steerButtons[1])
		expect(onSteer).toHaveBeenCalledTimes(2)
		expect(onSteer).toHaveBeenCalledWith(1)
	})

	it("calls onRemove with index when Remove button is clicked", () => {
		const onRemove = vi.fn()
		render(
			<QueuedMessages
				queue={mockQueue}
				onRemove={onRemove}
				onUpdate={vi.fn()}
				onSteer={vi.fn()}
			/>,
		)

		const removeButtons = screen.getAllByRole("button", { name: "" }) // trash buttons
		fireEvent.click(removeButtons[0])
		expect(onRemove).toHaveBeenCalledWith(0)

		fireEvent.click(removeButtons[1])
		expect(onRemove).toHaveBeenCalledWith(1)
	})
})
