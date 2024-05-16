"use client";

import * as React from "react";
import { format } from "date-fns";
import { id, tr } from "date-fns/locale";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { deleteBook, returnBook, updateStatus } from "@/actions";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Countdown from "react-countdown";
import CountdownTemplate from "./CountDownTemplate";
import moment from "moment";

export function TablePinjaman({ data }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  // Memformat tanggal dengan format yang diinginkan dan menggunakan Bahasa Indonesia
  const tanggal = (currentDate) => {
    return format(currentDate, "EEEE, yyyy-MM-dd HH:mm:ss", { locale: id });
  };

  const returned = (status) => (status == "dipulangkan" ? true : false);

  const Completionist = () => (
    <span>
      Waktu pinjam buku kamu sudah habis nih, silahkan kembalikan buku kamu ke
      perpus yah!
    </span>
  );

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <CountdownTemplate
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
      );
      // return <span>{hours}:{minutes}:{seconds}</span>;
    }
  };

  const handleReturnBook = async (data) => {
    try {
      toast.promise(returnBook(data), {
        loading: "Loading...",
        success: () => {
          return `Buku dengan id: ${data.id} Berhasil Pulangkan`;
        },
        error: "Error",
      });
    } catch (e) {
      toast.error("Gagal Memulangkan Buku");
      toast.error(e.message);
    }
  };

  const router = useRouter();

  const columns = [
    // id column
    {
      accessorKey: "id",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("id")}</div>,
    },

    // book_name column
    {
      accessorKey: "title",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Book Name
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{row.getValue("title")}</div>,
    },

    // cover column
    {
      accessorKey: "cover",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cover
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="h-20 w-20 rounded-full overflow-hidden mx-auto relative">
          <Image
            className="object-cover"
            src={row.getValue("cover")}
            alt="Alternatif Musuh"
            fill
          />
        </div>
      ),
    },

    // student_name column
    // {
    //   accessorKey: "student_name",
    //   header: ({ column }) => (
    //     <Button
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       Student Name
    //       <CaretSortIcon className="ml-2 h-4 w-4" />
    //     </Button>
    //   ),
    //   cell: ({ row }) => <div>{row.getValue("student_name")}</div>,
    // },

    // createdAt column
    {
      accessorKey: "borrowAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tanggal Peminjaman
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{tanggal(row.getValue("borrowAt"))}</div>,
    },

    // returnAt column
    {
      accessorKey: "returnAt",
      header: ({ column }) => (
        <Button
          variant="ghost"
          className="w-56"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Batas Peminjaman
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div>{tanggal(row.getValue("returnAt"))}</div>,
    },

    // {
    //   accessorKey: "returnAt",
    //   header: ({ column }) => (
    //     <Button
    //       variant="ghost"
    //       className="flex mx-auto "
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       <span>Waktu Tersisa</span>
    //       <CaretSortIcon className="ml-2 h-4 w-3" />
    //     </Button>
    //   ),
    //   cell: ({ row }) => (
    //     <div>
    //       <Countdown
    //         date={Number(moment(row.getValue("returnAt")).format("x"))}
    //         renderer={renderer}
    //       />
    //     </div>
    //   ),
    // },

    // status column
    {
      accessorKey: "status",
      header: ({ column }) => (
        <div
          className="mx-auto text-center cursor-default font-bold"
          variant="ghost"
        >
          Catatan
        </div>
      ),
      cell: ({ row }) => {
        return (
          <div className="text-center grid grid-cols-2 box-border text-sm gap-2 text-teal-900 w-32">
            {row.getValue("status").toLowerCase() === "dipinjam" && (
              <button className="p-1 rounded-md bg-green-200 w-32">
                Buku masih dipinjam.
              </button>
            )}
            {row.getValue("status").toLowerCase() === "dipulangkan" && (
              <button className="p-1 rounded-md bg-green-200 w-32">
                Tidak ada Sanksi
              </button>
            )}
            {row.getValue("status").toLowerCase() === "denda" && (
              <button className="p-1 rounded-md bg-yellow-200 w-32">
                Kamu di Denda Rp. 5.000 karna telat memulangkan buku
              </button>
            )}
            {row.getValue("status").toLowerCase() === "rusak" && (
              <button className="p-1 rounded-md bg-orange-200 w-32">
                Kamu di Denda Rp. 25.000 karna merusak buku
              </button>
            )}
            {row.getValue("status").toLowerCase() === "hilang" && (
              <button className="p-1 rounded-md bg-red-200 w-32">
                Kamu di Denda Rp. 150.000 karna menghilangkan buku
              </button>
            )}
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const handleDelete = async (id) => {
    try {
      // toast.promise(deleteBook(id), {
      //   loading: "Loading...",
      //   success: () => {
      //     return `Buku dengan id: ${id} Berhasil Dihapus`;
      //   },
      //   error: "Error",
      // });
    } catch (error) {
      toast.error(`Buku dengan id: ${id} Gagal Dihapus`);
      toast.error(error.message);
    }
    router.refresh();
  };

  return (
    <div className="w-full col-span-full">
      <Toaster />
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter title..."
          value={table.getColumn("title")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className=" h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
