import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    UseGuards,
  } from '@nestjs/common';
  import { BookService } from './book.service';
  import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
  import { RolesGuard } from 'src/auth/roles.guard';
  import { CreateBookDto, UpdateBookDto } from './dto/book.dto';
  
  @ApiTags('books')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Controller('books')
  export class BookController {
    constructor(private readonly bookService: BookService) {}
  
  
    @Post()
    createBook(@Body() createBookDto: CreateBookDto) {
      return this.bookService.createBook(createBookDto, 'Librarian'); 
    }
  
    @Get()
    findAllBooks() {
      return this.bookService.findAllBooks();
    }
  
    @Get(':id')
    findBookById(@Param('id') id: string) {
      return this.bookService.findBookById(id);
    }
  
    @Patch(':id')
    updateBook(
      @Param('id') id: string,
      @Body() updateBookDto: UpdateBookDto,
    ) {
      return this.bookService.updateBook(id, updateBookDto, 'Librarian'); 
    }
  
    @Delete(':id')
    deleteBook(@Param('id') id: string) {
      return this.bookService.deleteBook(id, 'Librarian'); 
    }
  
  
    @Post(':id/reserve')
    reserveBook(@Param('id') id: string) {
      return this.bookService.reserveBook(id);
    }
  
    @Post(':id/rent')
    rentBook(@Param('id') id: string) {
      return this.bookService.rentBook(id);
    }
  
    @Patch(':id/cancel-reservation')
    cancelReservation(@Param('id') id: string) {
      return this.bookService.cancelReservation(id);
    }
  
    @Patch(':id/return')
    returnBook(@Param('id') id: string) {
      return this.bookService.returnBook(id);
    }
  }
  