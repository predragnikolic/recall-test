import { honoClient } from "~/utils/honoRpc";
import type { InferResponseType } from "hono";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useZodForm } from "~/utils/useZodForm";
import { z } from "zod";
import { toast } from "react-toastify";
import AutoAnimateHeight from "react-auto-animate-height";
import { Button, Card, Input, Spinner, Textarea } from "@nextui-org/react";
import { classNames } from "~/utils/classNames";
import { Controller } from "react-hook-form";
import { BOOK_STATUSES, BookStatusPopover } from "./BookStatusPopover";
import { ChevronLeft } from "lucide-react";

type Book = InferResponseType<
	typeof honoClient.api.books.$get
>["items"][number];

export function BookFormItem({
	book,
	onReset,
	onSave,
	isExpanded = false,
	className = "",
}: {
	book?: Book;
	isExpanded?: boolean;
	className?: string;
	onReset?: () => void;
	onSave?: () => void;
}) {
	const queryClient = useQueryClient();
	const [showMore, setShowMore] = useState(isExpanded);
	const formType = book ? "edit" : "create";

	const { handleSubmit, control, formState, reset } = useZodForm({
		defaultValues: {
			id: book?.id ?? window.crypto.randomUUID(),
			title: book?.title ?? "",
			price: book ? book.price / 100 : 0,
			status: book?.status ?? "available",
			description: book?.description ?? "",
		},
		schema: z.object({
			id: z.string(),
			title: z.string().nonempty(),
			price: z.coerce.number().min(1).int(),
			status: z.enum(BOOK_STATUSES),
			description: z.string(),
		}),
	});

	const save = handleSubmit(async (formData) => {
		try {
			if (formType === "edit") {
				const res = await honoClient.api.books[":id"].$put({
					param: { id: formData.id },
					json: {
						title: formData.title,
						price: formData.price * 100,
						status: formData.status,
						description: formData.description,
					},
				});
				if (!res.ok) throw res;
			} else {
				const res = await honoClient.api.books.$post({
					json: {
						title: formData.title,
						price: formData.price * 100,
						status: formData.status,
						description: formData.description,
					},
				});
				if (!res.ok) throw res;
			}
			reset(formData);
			toast(`Book "${formData.title}" saved.`);
			await queryClient.invalidateQueries();
			setShowMore(false);
			onSave?.();
		} catch (e) {
			console.error("Saving the book failed", e);
			toast.error("Saving the book failed");
		}
	});
	return (
		<form onSubmit={save} className={className}>
			<AutoAnimateHeight ease="ease-in-out" className="shadow-small z-10">
				<Card
					className={classNames(
						"p-4 bg-[#222]/20 overflow-x-auto shadow-none product-list-grid content-center gap-3 w-full rounded-none transition-all duration-700",
						showMore && "rounded-br-lg rounded-bl-lg",
					)}
				>
					{/* col1*/}
					<div className="grow flex items-center">
						<Controller
							name="title"
							control={control}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input
									size="lg"
									placeholder="Book title"
									className="place-self-center"
									variant="flat"
									value={value}
									onBlur={onBlur}
									onChange={onChange}
									isInvalid={Boolean(formState.errors.title)}
									classNames={{
										inputWrapper: "bg-transparent shadow-none py-1 truncate",
										input: "truncate",
									}}
								/>
							)}
						/>
					</div>

					{/* col 2*/}
					<div className="flex flex-col justify-center">
						<Controller
							name="price"
							control={control}
							render={({ field: { onChange, onBlur, value } }) => (
								<Input
									size="sm"
									variant="flat"
									value={String(value)}
									onBlur={onBlur}
									onChange={onChange}
									placeholder="Price"
									startContent={<p className="whitespace-nowrap self-end">$</p>}
									endContent={
										<p className="whitespace-nowrap self-end text-[11px]">
											.00 {/*TODO don't hard code decimals*/}
										</p>
									}
									isInvalid={Boolean(formState.errors.price)}
									classNames={{
										inputWrapper:
											"bg-transparent shadow-none py-1 w-[13ch] mb-1",
										input: "text-right",
									}}
								/>
							)}
						/>
					</div>

					{/* col 3 */}
					<div className="flex items-center justify-center gap-2">
						<Controller
							name="status"
							control={control}
							render={({ field: { onChange, value } }) => (
								<BookStatusPopover value={value} onChange={onChange} />
							)}
						/>

						<Button
							variant="light"
							isIconOnly
							onPress={() => setShowMore(!showMore)}
						>
							<ChevronLeft
								className={classNames(
									"transition-all",
									showMore && "-rotate-90",
								)}
								strokeWidth={0.5}
							/>
						</Button>
					</div>

					{(formState.isDirty || formType === "create") && (
						<div className="flex justify-end gap-3 col-span-full">
							<Button
								type="button"
								color="primary"
								variant="light"
								className="uppercase"
								onPress={() => {
									reset();
									onReset?.();
									setShowMore(false);
								}}
							>
								Dismiss
							</Button>
							<Button
								disabled={formState.isSubmitting}
								endContent={
									formState.isSubmitting && <Spinner color="white" size="sm" />
								}
								type="submit"
								color="primary"
								className="uppercase"
							>
								Save
							</Button>
						</div>
					)}
				</Card>
			</AutoAnimateHeight>

			<Card
				className={classNames(
					"mx-4 rounded-t-none transition-all relative",
					showMore && "mb-3",
				)}
			>
				<AutoAnimateHeight ease="ease-in-out">
					<section
						className={classNames(
							"flex flex-col gap-3",
							showMore ? "h-[auto] overflow-y-auto" : "h-0",
						)}
					>
						{showMore && (
							<div className="flex flex-col p-3">
								<Controller
									name="description"
									control={control}
									render={({ field: { onChange, value } }) => (
										<Textarea
											placeholder="Write book description"
											className="less-nice-font"
											classNames={{
												input: 'leading-6'
											}}
											value={value}
											onChange={onChange}
											onBlur={onChange}
										/>
									)}
								/>
							</div>
						)}
					</section>
				</AutoAnimateHeight>
			</Card>
		</form>
	);
}
